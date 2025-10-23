import React from "react";
import { Link } from "react-router-dom";

export default function CategoryTile({ cat }) {
  const fallback = "/image/categories/v.jpg";

  const isValidImg = (u) =>
    typeof u === "string" &&
    u.trim().length > 0 &&
    /(\/image\/|^https?:\/\/).+\.(png|jpe?g|webp|gif)$/i.test(u);

  const base = isValidImg(cat?.image_url) ? cat.image_url : fallback;
  const src = `${base}?v=${encodeURIComponent(cat?.updated_at || "")}`;

  // Link each tile to the product page with the category as a query param
  const href = `/products?cat=${encodeURIComponent(cat?.slug || cat?.id || "")}`;

  return (
    <Link
      to={href}
      className="cat-card"
      title={cat?.name || "Category"}
      aria-label={cat?.name || "Category"}
    >
      <img
        src={src}
        alt={cat?.name || "Category"}
        loading="lazy"
        onError={(e) => {
          if (e.currentTarget.dataset.fallback !== "1") {
            e.currentTarget.dataset.fallback = "1";
            e.currentTarget.src = `${fallback}?v=${Date.now()}`;
          }
        }}
      />
      <div className="cat-name">{cat?.name || "Unnamed"}</div>
    </Link>
  );
}
