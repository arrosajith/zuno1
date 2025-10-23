// src/pages/Home.jsx
import { useEffect, useMemo, useState } from "react";
import { getCategories, getHomeSections } from "../api/api.js";
import HomeHeroGrid from "../components/HomeHeroGrid.jsx";
import CategoryCircleRail from "../components/CategoryCircleRail.jsx";
import ProductCard from "../components/ProductCard.jsx";
import CategoryGrid from "../components/CategoryGrid.jsx"; // <— use the reusable grid
import "../styles/home1.css";

export default function Home() {
  const [cats, setCats] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);

  const [home, setHome] = useState({ recent: [], best: [] });
  const [loadingHome, setLoadingHome] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getCategories();
        setCats(Array.isArray(data) ? data : (data?.rows ?? []));
      } finally {
        setLoadingCats(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await getHomeSections({ recent: 8, best: 8, cats: 0 });
        setHome({
          recent: data?.recent ?? [],
          best: data?.best ?? [],
        });
      } finally {
        setLoadingHome(false);
      }
    })();
  }, []);

  const topCats = useMemo(() => cats.slice(0, 18), [cats]);

  const asCard = (p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    final_price: p.final_price,
    qty: p.qty,
    image_url: p.image_url,
    images: p.image_url ? [{ url: p.image_url }] : [],
  });

  return (
    <div className="home-shein">
      {/* Hero */}
      <HomeHeroGrid />

      {/* Categories rail */}
      <section className="hs-section">
        <div className="hs-title"></div>
        {loadingCats ? (
          <div className="hs-loading">Loading…</div>
        ) : (
          <CategoryCircleRail
            items={topCats}
            onClick={(c) => (window.location.href = `/products?category_id=${c.id}`)}
          />
        )}
      </section>

      {/* Reusable Category Grid (uses fetched cats; falls back to mock if empty) */}
      {!loadingCats && (
        <CategoryGrid
          title="All Categories"
          cats={cats}
          showBanner={false}      // set true if you want the banner here
          linkParam="category_id" // or "cat"
          // limit={12}           // optionally limit the number of tiles
        />
      )}

      {/* Recently Added */}
      <section className="hs-section">
        <div className="hs-row">
          <div className="hs-title"></div>
          <a className="hs-link" href="/products?sort=newest"></a>
        </div>
        {loadingHome ? (
          <div className="hs-loading">Loading…</div>
        ) : home.recent.length === 0 ? (
          <div className="hs-empty"></div>
        ) : (
          <div className="hs-grid">
            {home.recent.map((p) => (
              <ProductCard key={p.id} p={asCard(p)} />
            ))}
          </div>
        )}
      </section>


        
    </div>
  );
}
