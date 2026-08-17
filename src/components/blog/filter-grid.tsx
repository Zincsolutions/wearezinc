"use client";

import { useMemo, useState } from "react";
import { GridCard, type CardPost } from "./cards";

// Category filter + grid + pagination. The original shipped Finsweet
// filter markup with no library attached (inert checkboxes); here the
// same checkboxes actually filter. Server-rendered page slice is shown
// until a filter is applied; filtering searches every post.
export function FilterGrid({
  posts,
  categories,
  page,
  pageSize,
}: {
  posts: CardPost[];
  categories: string[];
  page: number;
  pageSize: number;
}) {
  const [active, setActive] = useState<string[]>([]);
  const filtering = active.length > 0;
  const shown = useMemo(() => {
    if (!filtering) return posts.slice((page - 1) * pageSize, page * pageSize);
    return posts.filter((p) => p.categories.some((c) => active.includes(c)));
  }, [posts, active, filtering, page, pageSize]);
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));

  const toggle = (c: string) =>
    setActive((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  return (
    <>
      <div className="form-block w-form">
        <form
          id="wf-form-category-filters"
          name="wf-form-category-filters"
          data-name="category filters"
          fs-list-element="filters"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="category-filter-menu no-scrollbar">
            <a
              fs-list-element="clear"
              href="#"
              className="tag w-inline-block"
              onClick={(e) => { e.preventDefault(); setActive([]); }}
            >
              <div>All Posts</div>
            </a>
            <div className="w-dyn-list">
              <div role="list" className="category-filter-menu no-scrollbar _23423423 w-dyn-items">
                {categories.map((c) => (
                  <div key={c} role="listitem" className="collection-item-2 w-dyn-item">
                    <label id={c} fs-list-field="category" className="w-checkbox checkbox-field">
                      <input
                        type="checkbox"
                        name="Checkbox"
                        checked={active.includes(c)}
                        onChange={() => toggle(c)}
                        fs-list-value={c}
                        className="w-checkbox-input checkbox"
                      />
                      <span className="checkbox-label w-form-label">{c}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div fs-list-element="list" className="w-dyn-list">
        <div fs-list-load="pagination" role="list" className="blog6_list w-dyn-items">
          {shown.map((p) => (
            <GridCard key={p.slug} post={p} />
          ))}
        </div>
        {!filtering && totalPages > 1 && (
          <div role="navigation" aria-label="List" className="w-pagination-wrapper pagination1_page-button-wrapper">
            <div className="div-block-2">
              <a fs-list-element="page-button" href="#" className="pagination1_page-button w-inline-block" onClick={(e) => e.preventDefault()}>
                <div>1</div>
              </a>
              <a fs-list-element="page-dots" href="#" className="pagination1_page-button w-inline-block" onClick={(e) => e.preventDefault()}>
                <div>...</div>
              </a>
            </div>
            {page < totalPages && (
              <a href={`?190f5589_page=${page + 1}`} aria-label="Next Page" className="w-pagination-next next">
                <div className="w-inline-block">Next</div>
              </a>
            )}
          </div>
        )}
      </div>
    </>
  );
}
