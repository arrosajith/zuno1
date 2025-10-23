import { useState, useMemo } from "react";
import ProductModal from "./ProductModal.jsx";
import "../styles/product.css"; // keep if you have extra rules

export default function ProductCard({ p }) {
  const [open, setOpen] = useState(false);

  const discounted = Number(p.final_price) !== Number(p.price);
  const pct = useMemo(() => {
    const pr = Number(p.price || 0), fp = Number(p.final_price || pr);
    return pr > 0 ? Math.round(100 - (fp / pr) * 100) : 0;
  }, [p]);

  const mainImg = p.images?.[0]?.url || p.image_url || "/image/placeholders/product.png";
  const hoverImg = p.images?.[1]?.url || null;

  const colors = useMemo(() => {
    const raw = Array.isArray(p.colors) ? p.colors : [];
    return raw.slice(0, 5).map(c => (typeof c === "string" ? { name:c, hex:null } : c));
  }, [p]);

  const low = Number(p.qty || 0) > 0 && Number(p.low_stock_threshold || 0) >= Number(p.qty || 0);
  const out = Number(p.qty || 0) <= 0;

  return (
    <>
      <div className="product-card" onClick={() => setOpen(true)}>
        <div className="pc__img">
          <img className="main" src={mainImg} alt={p.name} loading="lazy" />
          {hoverImg && <img className="hover" src={hoverImg} alt="" loading="lazy" />}
          <div className="badges">
            {discounted && <span className="badge disc">-{pct}%</span>}
            {low && !out && <span className="badge low">Low stock</span>}
            {out && <span className="badge out">Out of stock</span>}
          </div>
        </div>

        <div className="body">
          <h4 title={p.name}>{p.name}</h4>

          <div className="price-row">
            {discounted && <span className="old">Rs {Number(p.price).toFixed(2)}</span>}
            <span className="new">Rs {Number(p.final_price || p.price || 0).toFixed(2)}</span>
          </div>

          {/* small preview of colors */}
          {colors.length > 0 && (
            <div className="color-row" aria-label="Available colors">
              {colors.map((c, i) => (
                <span key={`${c.name}-${i}`} className="color-dot" style={{ background: c.hex || "#000" }} title={c.name} />
              ))}
            </div>
          )}

          <div className="pc__btns">
            <button className="btn ghost" onClick={(e)=>{ e.stopPropagation(); setOpen(true); }}>View</button>
            <button className="btn primary" onClick={(e)=>{ e.stopPropagation(); setOpen(true); }}>Add to cart</button>
          </div>
        </div>
      </div>

      {open && (
        <ProductModal
          productId={p.id}
          open={open}
          onClose={() => setOpen(false)}
          startMode="add"
        />
      )}
    </>
  );
}
