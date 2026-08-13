import * as cheerio from "cheerio";
import fs from "node:fs";
import path from "node:path";
import { formatDate, type PostRow } from "./content";

const SITE = "https://www.wearezinc.com";

const tpl = (name: string): string =>
  fs.readFileSync(path.join(process.cwd(), "src", "templates", name), "utf8");

const abs = (p: string | null): string | null =>
  p ? (p.startsWith("http") ? p : SITE + p) : null;

/** Z-03/Z-04: head metadata the old blog never had — OG, twitter, Article JSON-LD. */
function setHead($: cheerio.CheerioAPI, post: PostRow) {
  const title = post.seo_title || post.name;
  const desc = post.meta_description || post.post_summary || "";
  const url = `${SITE}/post/${post.slug}`;
  const img = abs(post.main_image);

  $("title").text(title);
  $('meta[name="description"]').attr("content", desc);
  $('link[rel="canonical"]').attr("href", url);

  const og = [
    `<meta property="og:type" content="article"/>`,
    `<meta property="og:title" content="${esc(title)}"/>`,
    `<meta property="og:description" content="${esc(desc)}"/>`,
    `<meta property="og:url" content="${url}"/>`,
    img ? `<meta property="og:image" content="${esc(img)}"/>` : "",
    `<meta name="twitter:card" content="summary_large_image"/>`,
    `<meta name="twitter:title" content="${esc(title)}"/>`,
    `<meta name="twitter:description" content="${esc(desc)}"/>`,
    img ? `<meta name="twitter:image" content="${esc(img)}"/>` : "",
  ].join("");
  $('link[rel="canonical"]').after(og);

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.name,
    description: desc,
    image: img ?? undefined,
    datePublished: post.publish_date ?? undefined,
    url,
    author: { "@type": "Organization", name: "ZINC", url: SITE },
    publisher: { "@type": "Organization", name: "ZINC", url: SITE },
  };
  $("head").append(
    `<script type="application/ld+json">${JSON.stringify(ld)}</script>`
  );
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function fillCard(
  $: cheerio.CheerioAPI,
  $card: cheerio.Cheerio<never>,
  post: PostRow
) {
  $card.find("a").attr("href", `/post/${post.slug}`);
  const img = $card.find("img").first();
  img
    .attr("src", post.thumbnail_image || post.main_image || "")
    .attr("alt", post.name)
    .removeAttr("srcset")
    .removeAttr("sizes");
  $card.find("h1,h2,h3,h4").first().text(post.name);
  $card.find(".text-size-regular").first().text(post.post_summary ?? "");
  // category chips: either a nested dynamic list (grid cards) or a lone .tag.
  // The .tag element holds either an inner <div> (hero/related cards) or bare
  // text (grid cards, with fs-list-field="category" for Finsweet filtering).
  const setTagText = (scope: cheerio.Cheerio<never>, c: string) => {
    const tag = scope.find(".tag").first();
    if (!tag.length) return;
    const inner = tag.children("div").first();
    if (inner.length) inner.text(c);
    else tag.text(c);
  };
  const chipList = $card.find(".w-dyn-items").first();
  if (chipList.length) {
    const chipProto = chipList.children(".w-dyn-item").first().clone();
    chipList.empty();
    for (const c of post.categories) {
      const chip = chipProto.clone();
      setTagText(chip as never, c);
      chipList.append(chip);
    }
  } else {
    if (post.categories.length) setTagText($card, post.categories[0]);
    else $card.find(".tag").first().remove();
  }
  // listing cards show a date in some layouts
  const date = $card.find('[class*="date"] .text-size-small').last();
  if (date.length && post.publish_date) date.text(formatDate(post.publish_date));
}

export function renderPost(post: PostRow, related: PostRow[]): string {
  const $ = cheerio.load(tpl("post.html"));

  $("html").attr("data-wf-item-slug", post.slug);
  setHead($, post);

  $("h1.heading-style-h2").first().text(post.name);
  $(".blog-post-header4_date-wrapper .text-size-small").last().text(formatDate(post.publish_date));

  // category chips
  const meta = $(".blog-post-header4_meta-wrapper .w-dyn-items").first();
  const chipProto = meta.children(".w-dyn-item").first().clone();
  meta.empty();
  for (const c of post.categories.length ? post.categories : [""]) {
    const chip = chipProto.clone();
    chip.find(".tag div").first().text(c);
    if (c) meta.append(chip);
  }

  // hero image
  $(".blog-post-header4_image-wrapper img")
    .first()
    .attr("src", post.main_image ?? "")
    .attr("alt", post.name)
    .removeAttr("srcset")
    .removeAttr("sizes");

  // body
  $(".text-rich-text.w-richtext").first().html(post.post_body ?? "");

  // related posts
  const relList = $(".collection-list-wrapper-4 .w-dyn-items").first();
  const relProto = relList.children(".w-dyn-item").first().clone();
  relList.empty();
  if (related.length) {
    for (const r of related) {
      const card = relProto.clone();
      fillCard($, card as never, r);
      relList.append(card);
    }
  } else {
    $(".collection-list-wrapper-4").closest("section").remove();
  }

  return $.html();
}

const PAGE_SIZE = 12; // matches the old Webflow listing

export function renderBlog(
  posts: PostRow[],
  categories: { name: string }[],
  page = 1
): string {
  const $ = cheerio.load(tpl("blog.html"));

  const nonFeatured = posts.filter((p) => !p.featured);
  const totalPages = Math.max(1, Math.ceil(nonFeatured.length / PAGE_SIZE));
  page = Math.min(Math.max(1, page), totalPages);

  $(".w-dyn-list").each((_, list) => {
    const $list = $(list);
    const $items = $list.find(".w-dyn-items").first();
    const proto = $items.children(".w-dyn-item").first();
    if (!proto.length) return;

    if (proto.find('a[href^="/post/"]').length) {
      const featured = proto.find('[class*="featured"]').length > 0;
      // the grid mirrors the old site: featured post lives in the hero only,
      // and the server paginates like Webflow did (fs fetches other pages
      // through the next/previous links to filter across the full set)
      const source = featured
        ? posts.filter((p) => p.featured)
        : nonFeatured.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
      const chosen = featured && !source.length ? posts.slice(0, 1) : source;
      const protoClone = proto.clone();
      $items.empty();
      for (const p of chosen) {
        const card = protoClone.clone();
        fillCard($, card as never, p);
        $items.append(card);
      }
    } else if (proto.find('input[type="checkbox"]').length) {
      const protoClone = proto.clone();
      $items.empty();
      for (const c of categories) {
        const item = protoClone.clone();
        item.find('[class*="label"], span, div').filter((_, el) => $(el).children().length === 0).first().text(c.name);
        item.find("input").attr("value", c.name);
        $items.append(item);
      }
    }
  });

  // pagination: same param name as the old Webflow site so Finsweet and any
  // indexed ?page URLs keep working
  const wrap = $(".w-pagination-wrapper").first();
  if (totalPages <= 1) {
    wrap.remove();
  } else {
    const next = wrap.find(".w-pagination-next").first();
    if (page < totalPages) next.attr("href", `?190f5589_page=${page + 1}`);
    else next.remove();
    if (page > 1) {
      const prevHtml = `<a href="?190f5589_page=${page - 1}" aria-label="Previous Page" class="w-pagination-previous previous"><div class="w-inline-block">Previous</div></a>`;
      const target = wrap.find(".div-block-2").first();
      if (target.length) target.before(prevHtml);
      else wrap.prepend(prevHtml);
    }
    wrap.find(".w-page-count").text(`${page} / ${totalPages}`);
  }

  return $.html();
}
