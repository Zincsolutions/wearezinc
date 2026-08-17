import type { Metadata } from "next";
import Script from "next/script";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SiteAnalytics } from "@/components/site/analytics";
import { FeaturedCard } from "@/components/blog/cards";
import { FilterGrid } from "@/components/blog/filter-grid";
import { BLOGCTA } from "@/components/site/blog-fragments";
import { getAllPosts, getCategories, type PostRow } from "@/lib/content";
import "@/components/site/site.css";
import "@/components/site/page-animations.css";
import "./page.css";

// Blog listing, rebuilt from the Webflow template as React (Phase B).
// Data flow unchanged: Supabase via lib/content. The category filter is
// now functional (the original shipped filter markup with no library).

export const revalidate = 300;

const TITLE = "Blog | AI Strategy, AEO & Digital Growth Insights | ZINC";
const DESCRIPTION =
  "Practical insights on AI search, answer engine optimization, ecommerce, and web strategy from the ZINC team.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.wearezinc.com/blog" },
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const PAGE_SIZE = 12;

const toCard = (p: PostRow) => ({
  slug: p.slug,
  name: p.name,
  summary: p.post_summary,
  image: p.thumbnail_image || p.main_image,
  categories: p.categories,
});

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const raw = (sp["190f5589_page"] ?? sp["page"] ?? "1") as string;
  const page = Math.max(1, parseInt(raw, 10) || 1);
  const [posts, categories] = await Promise.all([getAllPosts(), getCategories()]);
  const featured = posts.filter((p) => p.featured);
  const hero = (featured.length ? featured : posts).slice(0, 1);
  const nonFeatured = posts.filter((p) => !p.featured);

  return (
    <div className="site">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <script
        dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('gsap-js');" }}
      />
      <Navbar />
      <main className="main-wrapper">
        <header id="blog-header-6" className="section_blog6 color-scheme-1">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large">
                <div className="blog6_component">
                  <div className="margin-bottom margin-xxlarge">
                    <div className="max-width-large">
                      <div className="margin-bottom margin-xsmall">
                        <div data-gsap-lines="" className="text-style-tagline">Ideas &amp; Insights</div>
                      </div>
                      <div className="margin-bottom margin-small">
                        <h1 data-gsap-lines="" className="heading-style-h1">Explore Our Latest Insights</h1>
                      </div>
                      <p className="text-size-medium fade-up">
                        Stay updated with our expert blog posts.
                      </p>
                    </div>
                  </div>
                  <div className="collection-list-wrapper-3 w-dyn-list">
                    <div role="list" className="w-dyn-items">
                      {hero.map((p) => (
                        <FeaturedCard key={p.slug} post={toCard(p)} />
                      ))}
                    </div>
                  </div>
                  <FilterGrid
                    posts={nonFeatured.map(toCard)}
                    categories={categories.map((c) => c.name)}
                    page={page}
                    pageSize={PAGE_SIZE}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>
        <div dangerouslySetInnerHTML={{ __html: BLOGCTA }} />
      </main>
      <Footer />
      <Script src="/js/reveal.js" strategy="afterInteractive" />
      <SiteAnalytics />
    </div>
  );
}
