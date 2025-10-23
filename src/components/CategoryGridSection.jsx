// src/components/CategoryGridSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./category-grid-section.css"; // or append styles to home1.css

export default function CategoryGridSection({ title = "Browse all categories", cats = [] }) {
  if (!cats?.length) return null;

  return (
    <section className="hs-section">
      <div className="hs-row">
        <div className="hs-title">{title}</div>
        <Link className="hs-link" to="/products">See all →</Link>
      </div>

      <div className="cat-grid">
        {cats.map((c) => (
          <Link
            key={c.id || c.slug || c.name}
            className="cat-card"
            to={`/products?category_id=${encodeURIComponent(c.id ?? c.slug ?? "")}`}
            title={c.name}
            aria-label={c.name}
          >
            <img
              src={(c.image_url || "/image/categories/v.jpg") + `?v=${encodeURIComponent(c.updated_at || "")}`}
              alt={c.name}
              loading="lazy"
              onError={(e) => {
                if (e.currentTarget.dataset.fallback !== "1") {
                  e.currentTarget.dataset.fallback = "1";
                  e.currentTarget.src = `/image/categories/v.jpg?v=${Date.now()}`;
                }
              }}
            />
            <div className="cat-name">{c.name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
