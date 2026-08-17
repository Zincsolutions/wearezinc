/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SiteAnalytics } from "@/components/site/analytics";
import { Blog42Card } from "@/components/blog/cards";
import { BACKBUTTON, CONTENTBOTTOM, POSTCTA } from "@/components/site/blog-fragments";
import { getPost, getRelatedPosts, getAllPosts, formatDate, type PostRow } from "@/lib/content";
import "@/components/site/site.css";
import "@/components/site/page-animations.css";
import "./page.css";

// Blog post page, rebuilt from the Webflow template as React (Phase B).
// Head metadata + Article JSON-LD carried over from the old renderer
// (Z-03/Z-04). ISR matches the previous route (300s).

export const revalidate = 300;

const SITE = "https://www.wearezinc.com";
const abs = (p: string | null) => (p ? (p.startsWith("http") ? p : SITE + p) : null);

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const title = post.seo_title || post.name;
  const description = post.meta_description || post.post_summary || "";
  const url = `${SITE}/post/${post.slug}`;
  const img = abs(post.main_image);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, type: "article", url, images: img ? [img] : undefined },
    twitter: { card: "summary_large_image", title, description, images: img ? [img] : undefined },
  };
}

function articleSchema(post: PostRow) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.name,
    description: post.meta_description || post.post_summary || "",
    image: abs(post.main_image) ?? undefined,
    datePublished: post.publish_date ?? undefined,
    url: `${SITE}/post/${post.slug}`,
    author: { "@type": "Organization", name: "ZINC", url: SITE },
    publisher: { "@type": "Organization", name: "ZINC", url: SITE },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const related = await getRelatedPosts(post.id);

  return (
    <div className="site">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <Navbar />
      <main className="main-wrapper">
        <header className="section_blog-post-header4 color-scheme-1">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large">
                <div className="blog-post-header4_component">
                  <div className="w-layout-grid blog-post-header4_content">
                    <div className="blog-post-header4_title-wrapper">
                      <div className="margin-bottom margin-medium">
                        <div dangerouslySetInnerHTML={{ __html: BACKBUTTON }} />
                      </div>
                      <div className="margin-bottom margin-small">
                        <div className="blog-post-header4_meta-wrapper">
                          <div className="w-dyn-list">
                            <div role="list" className="w-dyn-items">
                              {post.categories.map((c) => (
                                <div key={c} role="listitem" className="w-dyn-item">
                                  <div className="tag"><div>{c}</div></div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <h1 className="heading-style-h2">{post.name}</h1>
                      <div className="margin-top margin-medium">
                        <div className="blog-post-header4_date-wrapper">
                          <div className="text-size-small">Published on</div>
                          <div className="text-size-small">{formatDate(post.publish_date)}</div>
                        </div>
                      </div>
                    </div>
                    <div className="blog-post-header4_image-wrapper">
                      <img loading="eager" src={post.main_image ?? ""} alt={post.name} className="blog-post-header4_image" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <header className="section_content29 color-scheme-1">
          <div className="padding-global">
            <div className="container-large">
              <div className="padding-section-large">
                <div className="content29_component">
                  <div className="max-width-large align-center">
                    <div className="content29_content-wrapper">
                      <div aria-hidden="true" className="zinc-typescale-anchor inline-div-0"></div><div aria-hidden="true" className="zinc-typescale-h3h6 inline-div-0"></div>
                      <div
                        className="text-rich-text w-richtext"
                        dangerouslySetInnerHTML={{ __html: post.post_body ?? "" }}
                      />
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: CONTENTBOTTOM }} />
                    <div className="margin-top margin-large">
                      <div className="divider-horizontal"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        {related.length > 0 && (
          <section className="section_blog42">
            <div className="padding-global">
              <div className="container-large">
                <div className="padding-section-large">
                  <div className="blog42_component">
                    <div className="margin-bottom margin-xxlarge">
                      <div className="blog42_heading-wrapper">
                        <div className="blog42_heading">
                          <div className="max-width-large">
                            <div className="margin-bottom margin-xsmall">
                              <div className="text-style-tagline">Blog</div>
                            </div>
                            <div className="margin-bottom margin-xsmall">
                              <h2 className="heading-style-h2">Explore Our Latest Insights</h2>
                            </div>
                            <p className="text-size-medium">Stay updated with our recent blog posts.</p>
                          </div>
                        </div>
                        <div className="button-group is-right hide-mobile-landscape">
                          <a href="/blog" className="button is-secondary w-button">View all</a>
                        </div>
                      </div>
                    </div>
                    <div className="collection-list-wrapper-4 w-dyn-list">
                      <div id="w-node-_0bcfa6c0-1a8b-e6fc-4e9e-22eca3e1c167-fcdb443a" role="list" className="collection-list w-dyn-items">
                        {related.map((r) => (
                          <Blog42Card
                            key={r.slug}
                            post={{
                              slug: r.slug,
                              name: r.name,
                              summary: r.post_summary,
                              image: r.thumbnail_image || r.main_image,
                              categories: r.categories,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="show-mobile-landscape">
                      <div className="margin-top margin-xxlarge">
                        <div className="button-group is-right">
                          <a href="#" className="button is-secondary w-button">View all</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        <div dangerouslySetInnerHTML={{ __html: POSTCTA }} />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(post)) }}
      />
      <Script src="/js/reveal.js" strategy="afterInteractive" />
      <SiteAnalytics />
    </div>
  );
}
