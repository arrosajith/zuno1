// src/components/CategoryGrid.jsx
import React, { useMemo } from "react";
import CategoryTile from "./CategoryTile";
import "./category-grid.css";

/** MOCK CATEGORIES (used only when no `cats` prop is given) */
const FALLBACK_CATEGORIES = [
  { id: "phones", slug: "phones", name: "Phones", image_url: "/image/categories/a.png",   updated_at: "2025-10-23" },
  { id: "laptops", slug: "laptops", name: "Laptops", image_url: "/image/categories/b.png", updated_at: "2025-10-23" },
  { id: "watches", slug: "watches", name: "Watches", image_url: "/image/categories/6.png", updated_at: "2025-10-23" },
  { id: "tablets", slug: "tablets", name: "Tablets", image_url: "/image/categories/1.png", updated_at: "2025-10-23" },
   { id: "phones", slug: "phones", name: "Phones", image_url: "/image/categories/a.png",   updated_at: "2025-10-23" },
  { id: "laptops", slug: "laptops", name: "Laptops", image_url: "/image/categories/b.png", updated_at: "2025-10-23" },
  { id: "watches", slug: "watches", name: "Watches", image_url: "/image/categories/6.png", updated_at: "2025-10-23" },
  { id: "tablets", slug: "tablets", name: "Tablets", image_url: "/image/categories/1.png", updated_at: "2025-10-23" },
  
];

/**
 * Reusable Category Grid
 * Props:
 * - cats?: Category[]  (uses FALLBACK_CATEGORIES if empty)
 * - title?: string     (optional heading row)
 * - showBanner?: boolean (default false)
 * - bannerSrc?: string (default "/image/banners/hero.jpg")
 * - limit?: number     (slice items)
 * - linkParam?: "category_id" | "cat" (default "category_id")
 */
export default function CategoryGrid({
  cats = [],
  title,
  showBanner = false,
  bannerSrc = "/image/banners/o.png",
  limit,
  linkParam = "category_id",
}) {
  const items = useMemo(() => {
    const src = Array.isArray(cats) && cats.length ? cats : FALLBACK_CATEGORIES;
    return typeof limit === "number" ? src.slice(0, limit) : src;
  }, [cats, limit]);

  const handleClick = (c) => {
    const key = linkParam;
    const val = encodeURIComponent(c?.id ?? c?.slug ?? "");
    window.location.href = `/products?${key}=${val}`;
  };

  return (
    <section className="home slim">
      <div className="container">
        {showBanner && (
          <div className="banner-frame">
            <img src={bannerSrc} alt="Promotions" />
          </div>
        )}

        <section className="cat-section">
          {title && (
            <div className="hs-row" style={{ marginBottom: 8 }}>
              <div className="hs-title">{title}</div>
              <a className="hs-link" href="/products">See all →</a>
            </div>
          )}

          <div className="cat-grid">
            {items.map((c) => (
              <CategoryTile key={c.id ?? c.slug ?? c.name} cat={c} onClick={handleClick} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
