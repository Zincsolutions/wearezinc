/* eslint-disable @next/next/no-img-element */
// Blog cards mirroring the Webflow template markup (blog6 grid card,
// blog6 featured card) so the extracted CSS applies unchanged.

export interface CardPost {
  slug: string;
  name: string;
  summary: string | null;
  image: string | null;
  categories: string[];
}

export function CategoryChips({ categories }: { categories: string[] }) {
  return (
    <div className="w-dyn-list">
      <div role="list" className="w-dyn-items">
        {categories.map((c) => (
          <div key={c} role="listitem" className="w-dyn-item">
            <div fs-list-field="category" className="tag">{c}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GridCard({ post }: { post: CardPost }) {
  return (
    <div role="listitem" className="w-dyn-item">
      <div className="blog6_item">
        <div className="margin-bottom margin-small">
          <a href={`/post/${post.slug}`} className="w-inline-block">
            <div className="blog6_image-wrapper">
              <img loading="lazy" src={post.image ?? ""} alt={post.name} className="blog6_image" />
            </div>
          </a>
        </div>
        <div className="margin-bottom margin-xsmall">
          <CategoryChips categories={post.categories} />
        </div>
        <div className="margin-bottom margin-xxsmall">
          <a href={`/post/${post.slug}`} className="w-inline-block">
            <h3 className="heading-style-h5">{post.name}</h3>
          </a>
        </div>
      </div>
    </div>
  );
}

export function FeaturedCard({ post }: { post: CardPost }) {
  return (
    <div role="listitem" className="w-dyn-item">
      <a href={`/post/${post.slug}`} className="blog6_featured-item-link w-inline-block">
        <div className="blog6_image-wrapper">
          <img loading="lazy" src={post.image ?? ""} alt={post.name} className="blog6_image" />
        </div>
        <div className="blog6_featured-item-content">
          <div className="margin-bottom margin-xsmall">
            <div className="blog6_meta-wrapper">
              {post.categories.slice(0, 1).map((c) => (
                <div key={c} className="tag">{c}</div>
              ))}
            </div>
          </div>
          <div className="margin-bottom margin-xsmall">
            <h3 className="heading-style-h4">{post.name}</h3>
          </div>
          <div className="text-size-regular">{post.summary ?? ""}</div>
        </div>
      </a>
    </div>
  );
}

export function Blog42Card({ post }: { post: CardPost }) {
  return (
    <div role="listitem" className="collection-item w-dyn-item">
      <div className="blog42_item">
        <a href={`/post/${post.slug}`} className="blog42_item-link w-inline-block">
          <div className="margin-bottom margin-small">
            <div className="blog42_image-wrapper">
              <img loading="lazy" src={post.image ?? ""} alt={post.name} className="blog42_image" />
            </div>
          </div>
          <div className="margin-bottom margin-xsmall">
            <div className="blog42_meta-wrapper">
              {post.categories.slice(0, 1).map((c) => (
                <div key={c} className="tag"><div>{c}</div></div>
              ))}
              <div className="text-size-small">5 min read</div>
            </div>
          </div>
          <div className="margin-bottom margin-xxsmall">
            <h3 className="heading-style-h5">{post.name}</h3>
          </div>
          <div className="text-size-regular">{post.summary ?? ""}</div>
          <div className="margin-top margin-small">
            <div className="button-group">
              <div className="button is-link is-icon">
                <div>Read more</div>
                <div className="icon-embed-xxsmall w-embed">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 3L11 8L6 13" stroke="CurrentColor" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
