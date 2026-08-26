import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import * as cheerio from "cheerio";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

test("every Webflow manifest entry has a captured HTML document", () => {
  const manifest = JSON.parse(read("public/_wf/manifest.json"));

  assert.ok(Array.isArray(manifest.pages));
  assert.ok(manifest.pages.includes("index"));

  for (const page of manifest.pages) {
    assert.ok(
      fs.existsSync(path.join(root, "public/_wf", `${page}.html`)),
      `Missing public/_wf/${page}.html`
    );
  }
});

test("server secrets are never declared as public variables", () => {
  const example = read(".env.example");

  assert.doesNotMatch(example, /NEXT_PUBLIC_(?:SUPABASE_SERVICE_ROLE|HUBSPOT)/);
  assert.match(example, /^SUPABASE_SERVICE_ROLE_KEY=/m);
  assert.match(example, /^HUBSPOT_PRIVATE_APP_TOKEN=/m);
});

test("all route families use the branded ZINC favicon", () => {
  const faviconPath = "public/wf/695bda13c7c5d5a8fcdb45fc_zinc_fav.png";
  const webclipPath = "public/wf/695bda13c7c5d5a8fcdb45fd_zinc_webclip.png";
  const layout = read("src/app/layout.tsx");
  const webflowHome = read("public/_wf/index.html");

  assert.ok(fs.existsSync(path.join(root, faviconPath)));
  assert.ok(fs.existsSync(path.join(root, webclipPath)));
  assert.doesNotMatch(layout, /favicon\.ico/);
  assert.match(layout, /695bda13c7c5d5a8fcdb45fc_zinc_fav\.png/);
  assert.match(layout, /695bda13c7c5d5a8fcdb45fd_zinc_webclip\.png/);
  assert.match(webflowHome, /695bda13c7c5d5a8fcdb45fc_zinc_fav\.png/);
  assert.equal(fs.existsSync(path.join(root, "src/app/favicon.ico")), false);
});

test("legacy domains retain path-preserving redirect rules", () => {
  const config = read("next.config.ts");

  assert.match(config, /value: "zincsolutions\.com"/);
  assert.match(config, /value: "www\.zincsolutions\.com"/);
  assert.match(config, /destination: "https:\/\/www\.wearezinc\.com\/:path\*"/);
});

test("internal Webflow backing documents cannot be indexed", () => {
  const config = read("next.config.ts");
  const robots = read("src/app/robots.ts");

  assert.match(config, /source: "\/_wf\/:path\*"/);
  assert.match(config, /X-Robots-Tag/);
  assert.match(config, /noindex, nofollow/);
  assert.doesNotMatch(robots, /disallow:\s*\["\/_wf\/"\]/);
});

test("sitemap dates are normalized to ISO 8601", () => {
  const sitemap = read("src/app/sitemap.ts");

  assert.match(sitemap, /function normalizeLastModified/);
  assert.match(sitemap, /parsed\.toISOString\(\)/);
  assert.doesNotMatch(sitemap, /lastModified: COMPONENT_LAST_MODIFIED\[p\] \|\| capturedDate/);
});

test("componentized landing pages have one primary heading", () => {
  const pages = [
    "src/app/(home)/content.tsx",
    "src/app/solutions/ecommerce-acceleration/content.tsx",
    "src/app/solutions/website-design-development/content.tsx",
  ];

  for (const page of pages) {
    const h1Count = read(page).match(/<h1\b/g)?.length ?? 0;
    assert.equal(h1Count, 1, `${page} should contain exactly one h1`);
  }
});

test("homepage hero preserves the approved Webflow headline", () => {
  const files = [
    "src/app/(home)/content.tsx",
    "public/_wf/index.html",
    "migration/webflow/pages/index.html",
  ];

  for (const file of files) {
    const home = read(file);
    assert.doesNotMatch(home, /AI-Driven Strategy\./, `${file} must not invent hero copy`);
    assert.match(home, /&gt; see Further/, `${file} must preserve the first line`);
    assert.match(home, /GO BiggeR &lt;/, `${file} must preserve the second line`);
  }

  assert.match(read(files[0]), /hero-headline-line/);
});

test("homepage hero uses a lightweight, reduced-motion-safe settle animation", () => {
  const homeCss = read("src/app/(home)/page.css");
  const homePage = read("src/app/(home)/page.tsx");

  assert.match(homeCss, /@media \(prefers-reduced-motion: no-preference\)/);
  assert.match(
    homeCss,
    /animation: hero-headline-settle 1400ms cubic-bezier\(\.25, \.1, \.25, 1\) both/
  );
  assert.match(homeCss, /animation-delay: 70ms/);
  assert.match(homeCss, /nth-child\(2\) \{ animation-delay: 250ms/);
  assert.match(homeCss, /@keyframes hero-headline-settle/);
  assert.match(homeCss, /transform: translate3d\(0, \.12em, 0\)/);
  assert.match(homeCss, /animation: hero-subtext-settle 900ms/);
  assert.match(homeCss, /hero-subtext[\s\S]*animation-delay: 850ms/);
  assert.match(homeCss, /@keyframes hero-subtext-settle/);
  assert.match(read("src/app/(home)/content.tsx"), /hero-subtext/);
  assert.match(homeCss, /opacity: 0/);
  assert.doesNotMatch(homePage, /reveal\.js|gsap|SplitType/);
});

test("case-study images request enough pixels for their rendered width", () => {
  const pages = [
    "public/_wf/work/dfnd-shopify-website-design.html",
    "public/_wf/work/pivot.html",
    "migration/webflow/pages/work/dfnd-shopify-website-design.html",
    "migration/webflow/pages/work/pivot.html",
  ];
  const fullWidthClasses = new Set([
    "portfolio4-header_image",
    "portfolio4-gallery1_image1",
    "portfolio4-gallery1_image4",
    "portfolio4-gallery2_image3",
  ]);
  const splitWidthClasses = new Set([
    "portfolio4-gallery1_image2",
    "portfolio4-gallery1_image3",
    "portfolio4-gallery2_image1",
    "portfolio4-gallery2_image2",
    "portfolio4-related_image",
  ]);

  for (const page of pages) {
    const $ = cheerio.load(read(page));
    const responsiveImages = $("img[srcset]").filter((_, image) =>
      ($(image).attr("class") ?? "").includes("portfolio4-")
    );

    assert.ok(responsiveImages.length > 0, `${page} should contain responsive images`);

    responsiveImages.each((_, image) => {
      const element = $(image);
      const imageClass = (element.attr("class") ?? "")
        .split(/\s+/)
        .find((className) => className.startsWith("portfolio4-"));

      if (fullWidthClasses.has(imageClass)) {
        assert.equal(element.attr("sizes"), "100vw", `${page} ${imageClass}`);
      }

      if (splitWidthClasses.has(imageClass)) {
        assert.equal(
          element.attr("sizes"),
          "(max-width: 767px) 100vw, 50vw",
          `${page} ${imageClass}`
        );
      }
    });
  }
});

test("known migration placeholders cannot return", () => {
  const source = [
    read("src/app/(home)/faq-items.ts"),
    read("src/app/solutions/website-design-development/content.tsx"),
  ].join("\n");

  assert.doesNotMatch(source, /This sets expectations without duplicating/);
  assert.doesNotMatch(source, /href="\/lander-2"/);
  assert.doesNotMatch(source, /href="#" className="button is-link is-icon w-inline-block"><\/a>/);
});

test("shared navigation does not prefetch static Webflow routes as RSC", () => {
  const shell = [
    read("src/components/site/navbar.tsx"),
    read("src/components/site/footer.tsx"),
  ].join("\n");

  assert.doesNotMatch(shell, /<Link[^>]+href="\/solutions\/on-brand-aeo-sprint"/);
  assert.doesNotMatch(shell, /<Link[^>]+href="\/(?:work|about-us|contact-us)"/);
  assert.match(shell, /<a href="\/solutions\/on-brand-aeo-sprint"/);
});

test("form handling is durable, privacy-safe, and measurable", () => {
  const route = read("src/app/api/forms/route.ts");
  const client = read("public/js/zinc-forms.js");
  const migration = read(
    "supabase/migrations/20260825171943_harden_forms_and_database_advisors.sql"
  );

  assert.match(route, /rpc\("check_form_rate_limit"/);
  assert.match(route, /\.eq\("id", submission\.id\)/);
  assert.doesNotMatch(route, /failed for \$\{p\.email\}/);
  assert.match(client, /'generate_lead'/);
  assert.match(migration, /set search_path = ''/);
  assert.match(migration, /enable row level security/);
  assert.match(migration, /grant execute[\s\S]*to service_role/);
});

test("marketing CTA tracking is consistent and privacy-safe", () => {
  const analytics = read("public/js/zinc-analytics.js");
  const component = read("src/components/site/analytics.tsx");

  assert.match(component, /src="\/js\/zinc-analytics\.js"/);
  assert.match(component, /wearezinc\\\.com/);
  assert.match(analytics, /wearezinc\\\.com/);
  assert.match(analytics, /"cta_click"/);
  assert.match(analytics, /cta_text:/);
  assert.match(analytics, /cta_location:/);
  assert.match(analytics, /cta_destination:/);
  assert.match(analytics, /destination === "email"[\s\S]*"Email ZINC"/);
  assert.match(analytics, /destination === "phone"[\s\S]*"Call ZINC"/);
  assert.doesNotMatch(analytics, /link_url:/);

  const manifest = JSON.parse(read("public/_wf/manifest.json"));
  const staticDocuments = manifest.pages
    .map((page) => `public/_wf/${page}.html`)
    .concat("src/templates/blog.html", "src/templates/post.html");

  for (const file of staticDocuments) {
    const document = read(file);
    assert.match(
      document,
      /<script src="\/js\/zinc-analytics\.js" defer><\/script>/,
      `${file} must load CTA tracking`
    );
    assert.match(
      document,
      /var ga4=document\.createElement\("script"\)/,
      `${file} must load GA4 only after the production-host check`
    );
    assert.doesNotMatch(
      document,
      /<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js/,
      `${file} must not load GA4 directly on previews or local development`
    );
  }
});
