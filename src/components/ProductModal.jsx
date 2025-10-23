import { useEffect, useMemo, useState } from "react";
import { getProductById } from "../api/api.js";
import { useCart } from "../context/CartContext.jsx";
import "../styles/modal.css";

export default function ProductModal({ productId, open, onClose, startMode = "add" }) {
  const { addItem } = useCart();
  const [loading, setLoading] = useState(false);
  const [p, setP] = useState(null);

  const [size, setSize] = useState("");
  const [color, setColor] = useState(null); // {name, hex}
  const [qty, setQty] = useState(1);

  const [thumbs, setThumbs] = useState([]);  // [{url, color, color_hex, is_primary, sort_order}]
  const [idx, setIdx] = useState(0);         // selected image index
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!open || !productId) return;
    setLoading(true);
    setErr("");
    getProductById(productId)
      .then((data) => {
        setP(data);

        // sizes/colors normalize
        const sizes = Array.isArray(data?.sizes) ? data.sizes : [];
        const colors = (Array.isArray(data?.colors) ? data.colors : []).map(c => typeof c === "string" ? { name: c, hex: null } : c);

        if (sizes.length === 1) setSize(sizes[0]);
        if (colors.length === 1) setColor(colors[0]);

        // images normalize
        const imgs = (Array.isArray(data?.images) ? data.images : [])
          .filter(x => x && x.url)
          .sort((a,b) => (Number(a.sort_order)||0) - (Number(b.sort_order)||0));
        const final = imgs.length
          ? imgs
          : [{ url: data?.image_url || "/image/placeholders/product.png", color: null, color_hex: null, is_primary: true, sort_order: 0 }];

        setThumbs(final);
        setIdx( Math.max(0, final.findIndex(t => t.is_primary) ) );
      })
      .catch((e) => { console.error(e); setErr("Failed to load product."); })
      .finally(() => setLoading(false));
  }, [open, productId]);

  useEffect(() => {
    if (!open) {
      setIdx(0); setQty(1); setErr("");
    }
  }, [open]);

  // Filter thumbnails by selected color (if any exist for that color)
  const filteredThumbs = useMemo(() => {
    if (!color) return thumbs;
    const colored = thumbs.filter(t => (t.color || "") === color.name);
    return colored.length ? colored : thumbs;
  }, [thumbs, color]);

  // Make a color swatch list. Prefer first image per color; else color hex; else simple dots.
  const colorOptions = useMemo(() => {
    const map = new Map();
    thumbnailsLoop: for (const t of thumbs) {
      if (!t.color) continue;
      if (!map.has(t.color)) {
        map.set(t.color, { name: t.color, hex: t.color_hex || null, preview: t.url });
      }
    }
    // Merge with p.colors (so colors without images still show)
    const arr = [];
    const colors = Array.isArray(p?.colors) ? p.colors : [];
    for (const c of colors) {
      const obj = typeof c === "string" ? { name: c, hex: null } : c;
      arr.push({ ...obj, preview: map.get(obj.name)?.preview || null });
    }
    // If no colors at all, empty array
    return arr;
  }, [thumbs, p]);

  const mainImg = filteredThumbs[idx] || filteredThumbs[0];

  const finalPrice = useMemo(() => Number(p?.final_price ?? p?.price ?? 0), [p]);
  const stock = useMemo(() => Math.max(0, Number(p?.qty ?? 0)), [p]);

  const requiredOk = useMemo(() => {
    const sizesOk  = !Array.isArray(p?.sizes) || p.sizes.length === 0 || !!size;
    const colorsOk = !Array.isArray(p?.colors) || p.colors.length === 0 || !!color;
    return sizesOk && colorsOk;
  }, [p, size, color]);

  function inc() { setQty(q => Math.min(q + 1, stock || 1)); }
  function dec() { setQty(q => Math.max(1, q - 1)); }

  function tryAdd(goCart = false) {
    setErr("");
    if (!requiredOk) { setErr("Please select the required options."); return; }
    if (qty > stock) { setErr("Selected quantity exceeds available stock."); return; }

    addItem({
      id: p.id,
      name: p.name,
      price: Number(p.price),
      final_price: finalPrice,
      size: size || null,
      color: color?.name || null,
      color_hex: color?.hex || null,
      qty,
      image_url: mainImg?.url || p.image_url,
      stock
    });
    if (goCart) window.location.href = "/cart";
    onClose?.();
  }

  if (!open) return null;

  return (
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal__wrap modal__wrap--xl" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal__close" onClick={onClose} aria-label="Close">×</button>

        {loading ? (
          <div className="modal__loading">Loading…</div>
        ) : !p ? (
          <div className="modal__loading">No product.</div>
        ) : (
          <div className="pm__grid">
            {/* LEFT: main image + thumbs */}
            <div className="pm__left">
              <div className="pm__main">
                <img
                  src={`${(mainImg?.url || "/image/placeholders/product.png")}?v=${encodeURIComponent(p?.updated_at || "")}`}
                  alt={p.name}
                />
              </div>

              <div className="pm__thumbs">
                {filteredThumbs.map((t, i) => (
                  <button
                    key={`${t.url}-${i}`}
                    className={`pm__thumb ${i === idx ? "active" : ""}`}
                    onClick={() => setIdx(i)}
                    title={t.color || p.name}
                  >
                    <img src={t.url} alt="" />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT: details */}
            <div className="pm__right">
              <h3 className="pm__title">{p.name}</h3>

              <div className="pm__price">
                {Number(p.final_price) !== Number(p.price) ? (
                  <>
                    <span className="old">Rs {Number(p.price).toFixed(2)}</span>
                    <span className="new">Rs {Number(p.final_price).toFixed(2)}</span>
                    <span className="off">
                      {Math.round((1 - (p.final_price / p.price)) * 100)}% off
                    </span>
                  </>
                ) : (
                  <span className="new">Rs {finalPrice.toFixed(2)}</span>
                )}
              </div>

              {/* Color Family (image swatches if available, else color dots) */}
              {colorOptions.length > 0 && (
                <div className="pm__block">
                  <div className="pm__label">Color</div>
                  <div className="pm__colors">
                    {colorOptions.map((c, i) => {
                      const active = color?.name === c.name;
                      return (
                        <button
                          key={`${c.name}-${i}`}
                          className={`pm__color ${active ? "active" : ""}`}
                          onClick={() => { setColor(c); setIdx(0); }}
                          title={c.name}
                        >
                          {c.preview ? (
                            <img src={c.preview} alt={c.name} className="pm__color-img" />
                          ) : (
                            <span
                              className="pm__color-dot"
                              style={{ background: c.hex || "#000", border: "1px solid #ddd" }}
                            />
                          )}
                          <span className="pm__color-name">{c.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {Array.isArray(p?.sizes) && p.sizes.length > 0 && (
                <div className="pm__block">
                  <div className="pm__label">Size</div>
                  <div className="pm__sizes">
                    {p.sizes.map((s) => (
                      <button
                        key={s}
                        className={`chip ${size === s ? "active" : ""}`}
                        onClick={() => setSize(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Qty + Stock */}
              <div className="pm__block">
                <div className="pm__label">Quantity</div>
                <div className="pm__qtyrow">
                  <div className="qty">
                    <button onClick={dec} aria-label="Decrease">−</button>
                    <input
                      type="number"
                      min="1"
                      max={stock || 1}
                      value={qty}
                      onChange={(e) => setQty(Math.max(1, Math.min(Number(e.target.value || 1), stock || 1)))}
                    />
                    <button onClick={inc} aria-label="Increase">+</button>
                  </div>
                  <div className={`stock ${stock <= 0 ? "out" : stock <= (p.low_stock_threshold ?? 0) ? "low" : "ok"}`}>
                    {stock > 0 ? `${stock} in stock` : "Out of stock"}
                  </div>
                </div>
              </div>

              {err && <div className="error">{err}</div>}

              {/* CTAs */}
              <div className="pm__cta">
                <button className="btn ghost" onClick={() => tryAdd(true)}>Buy Now</button>
                <button className="btn primary" disabled={!requiredOk || stock <= 0} onClick={() => tryAdd(false)}>
                  Add to Cart
                </button>
              </div>

              {/* Optional long description */}
              {p.description && <div className="pm__desc">{p.description}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
