#!/usr/bin/env python3
"""Capture a read-only snapshot of the live Webflow site into migration/webflow/.

Writes:
  migration/webflow/pages/<path>.html   rendered HTML of every sitemap URL (+404)
  migration/webflow/assets/<basename>   every referenced website-files.com asset
  migration/webflow/manifest.json       url -> file map, asset list, capture date

The snapshot is reference material for the Phase A port. Never import from it
at runtime.
"""
import json
import os
import re
import sys
import urllib.request
import urllib.parse
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import date

SITE = "https://www.wearezinc.com"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MIG = os.path.join(ROOT, "migration", "webflow")
PAGES = os.path.join(MIG, "pages")
ASSETS = os.path.join(MIG, "assets")

ASSET_URL = re.compile(
    r"https://(?:cdn\.prod\.website-files\.com|uploads-ssl\.webflow\.com|assets(?:-global)?\.website-files\.com)/[^\"\s)\',]+"
)

UA = {"User-Agent": "Mozilla/5.0 (Macintosh) zinc-migration-capture/1.0"}


def get(url: str) -> bytes:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()


def page_path(url: str) -> str:
    path = urllib.parse.urlparse(url).path.strip("/") or "index"
    return os.path.join(PAGES, path + ".html")


def main() -> None:
    os.makedirs(PAGES, exist_ok=True)
    os.makedirs(ASSETS, exist_ok=True)

    sitemap = get(SITE + "/sitemap.xml").decode()
    urls = re.findall(r"<loc>([^<]+)</loc>", sitemap)
    print(f"{len(urls)} URLs in sitemap")

    manifest = {"captured": str(date.today()), "site": SITE, "pages": {}, "assets": []}
    asset_urls: set[str] = set()

    def fetch_page(url):
        try:
            html = get(url).decode()
        except Exception as e:
            print(f"  page failed {url}: {e}", file=sys.stderr)
            return url, None
        dest = page_path(url)
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        with open(dest, "w") as f:
            f.write(html)
        return url, html

    with ThreadPoolExecutor(8) as ex:
        futs = [ex.submit(fetch_page, u) for u in urls]
        for fut in as_completed(futs):
            url, html = fut.result()
            if html is None:
                continue
            manifest["pages"][url] = os.path.relpath(page_path(url), MIG)
            asset_urls.update(ASSET_URL.findall(html))

    # the rendered 404 page (fetch a URL that cannot exist)
    try:
        get(SITE + "/zzz-capture-404-probe")
    except urllib.error.HTTPError as e:
        html = e.read().decode()
        with open(os.path.join(PAGES, "404.html"), "w") as f:
            f.write(html)
        manifest["pages"]["<404>"] = "pages/404.html"
        asset_urls.update(ASSET_URL.findall(html))

    # assets referenced inside the shared CSS (fonts, background images)
    css_urls = [u for u in asset_urls if u.endswith(".css")]
    for cu in css_urls:
        try:
            asset_urls.update(ASSET_URL.findall(get(cu).decode()))
        except Exception as e:
            print(f"  css scan failed {cu}: {e}", file=sys.stderr)

    def fetch_asset(url):
        base = os.path.basename(urllib.parse.unquote(url.split("?")[0]))
        dest = os.path.join(ASSETS, base)
        if not os.path.exists(dest):
            try:
                data = get(url)
            except Exception as e:
                print(f"  asset failed {url}: {e}", file=sys.stderr)
                return None
            with open(dest, "wb") as f:
                f.write(data)
        return base

    print(f"{len(asset_urls)} unique assets")
    with ThreadPoolExecutor(12) as ex:
        futs = {ex.submit(fetch_asset, u): u for u in sorted(asset_urls)}
        for fut in as_completed(futs):
            base = fut.result()
            if base:
                manifest["assets"].append(base)

    manifest["assets"].sort()
    with open(os.path.join(MIG, "manifest.json"), "w") as f:
        json.dump(manifest, f, indent=2)
    print(f"done: {len(manifest['pages'])} pages, {len(manifest['assets'])} assets")


if __name__ == "__main__":
    main()
