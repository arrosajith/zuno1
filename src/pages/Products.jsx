import React, { useMemo, useState } from "react";
import "../styles/product.css"; // keep using the CSS you already have

/* ---------------- CATEGORIES ---------------- */
const CATEGORIES = [
  { id: "Oppo",  name: "Oppo"  },
  { id: "Honor", name: "Honor" },
  { id: "Xiaomi", name: "Xiaomi" },
  { id: "Vivo", name: "Vivo" },
  { id: "samsung", name: "samsung" },
  

];

/* ---------------- MOCK PRODUCTS BY CATEGORY ---------------- */
const DATA = {
  Oppo: [
    {
      id: "ph-1",
      name: "Oppo A5X 4/64 - 128",
      price: 34999,
      discount_t: "PERCENT",
      discount_v: 0,
      rating: 4.6,
      reviews: 100,
      stock_qty: 6,
      images: [
        "/image/products/mobiles/oppo/oppa5x.jpg",
        "/image/products/mobiles/oppo/oppa5xb.jpg",
        "/image/products/mobiles/oppo/oppa5xs.jpg",
      ],
      desc: "",

    },
    {
      id: "ph-2",
      name: "Oppo A5 8GB",
      price: 66990,
      discount_t: "PERCENT",
      discount_v: 0,
      rating: 4.4,
      reviews: 26,
      stock_qty: 12,
      images: [
        "/image/products/mobiles/A5-8/A5f.jpg",
        "/image/products/mobiles/A5-8/A5b.jpg",
        "/image/products/mobiles/A5-8/A5d.jpg",
        "/image/products/mobiles/A5-8/A5dd.jpg",

      ],
      desc: "",
    },

        {
      id: "ph-3",
      name: "Oppo A5 6GB",
      price: 53990,
      discount_t: "PERCENT",
      discount_v: 0,
      rating: 4.4,
      reviews: 26,
      stock_qty: 12,
      images: [
        "/image/products/mobiles/A5-6/A56.jpg",
        "/image/products/mobiles/A5-6/A56f.jpg",
        "/image/products/mobiles/A5-6/A56d.jpg",
        "/image/products/mobiles/A5-6/A56b.jpg",

      ],
      desc: "",
    },

  ],
  Honor: [
    {
      id: "lp-1",
      name: "Honor X6c 6GB",
      price: 42999,
      discount_t: "AMOUNT",
      discount_v: 0,
      rating: 4.7,
      reviews: 54,
      stock_qty: 3,
      images: [
        "/image/products/mobiles/HonorX6c/HX6cf.jpg",
        "/image/products/mobiles/HonorX6c/HX6cbs.jpg",
        "/image/products/mobiles/HonorX6c/HX6cb.jpg",
        "/image/products/mobiles/HonorX6c/HX6cfs.jpg",
      ],
      desc: "144Hz display, RTX graphics, RGB keyboard.",
    },
    {
      id: "lp-2",
      name: "Honor H400 5G 12GB”",
      price: 149999,
      discount_t: "NONE",
      discount_v: 0,
      rating: 4.5,
      reviews: 38,
      stock_qty: 10,
      images: [
        "/image/products/mobiles/HH400/hh.jpg",
        "/image/products/mobiles/HH400/hhb.jpg",
        "/image/products/mobiles/HH400/hhbd.jpg",
        "/image/products/mobiles/HH400/hhf.jpg",
        
      ],
      desc: "Thin & light, all-day battery, USB-C.",
    },
        {
      id: "lp-2",
      name: "Honor H400 Pro 5G 12GB”",
      price: 199999,
      discount_t: "NONE",
      discount_v: 0,
      rating: 4.5,
      reviews: 38,
      stock_qty: 10,
      images: [
              "/image/products/mobiles/HH400pro/HH400.jpg",
              "/image/products/mobiles/HH400pro/HH400b.jpg",
              "/image/products/mobiles/HH400pro/HH400ds.jpg",
              "/image/products/mobiles/HH400pro/HH400f.jpg",

      ],
      desc: "Thin & light, all-day battery, USB-C.",
    },
  ],
  Xiaomi: [
    {
      id: "wt-1",
      name: "Xiaomi Redmi Note 14 4G 8GB",
      price: 64999,
      discount_t: "PERCENT",
      discount_v: 0,
      rating: 4.2,
      reviews: 92,
      stock_qty: 21,
      images: [
        "/image/products/mobiles/Xiaomi/note14/14f.jpg",
        "/image/products/mobiles/Xiaomi/note14/14b.jpg",
        "/image/products/mobiles/Xiaomi/note14/14bd.jpg",
        "/image/products/mobiles/Xiaomi//note14/14t.jpg",
        "/image/products/mobiles/Xiaomi//note14/14s.jpg",

      ],
      desc: "AMOLED, GPS, 7-day battery.",
    },
    
  ],


  Vivo: [
    {
      id: "wt-1",
      name: "vivo Y04 4GB",
      price: 32990,
      discount_t: "PERCENT",
      discount_v: 0,
      rating: 4.2,
      reviews: 92,
      stock_qty: 21,
      images: [
        "/image/products/mobiles/vivo/y4/y4f.jpg",
        "/image/products/mobiles/vivo/y4/y4b.jpg",
        "/image/products/mobiles/vivo/y4/y4sl.jpg",
        "/image/products/mobiles/vivo/y4/y4bsrjpg",
        "/image/products/mobiles/vivo/y4/y4t.jpg",

      ],
      desc: "AMOLED, GPS, 7-day battery.",
    },
  {
      id: "lp-2",
      name: "Vivo Y27s 8GB”",
      price: 77999,
      discount_t: "NONE",
      discount_v: 0,
      rating: 4.5,
      reviews: 38,
      stock_qty: 10,
      images: [
        "/image/products/mobiles/vivo/y27/yf.jpg",
        "/image/products/mobiles/vivo/y27/yb.jpg",
        "/image/products/mobiles/vivo/y27/yff.jpg",
        "/image/products/mobiles/vivo/y27/ytjpg",
        "/image/products/mobiles/vivo/y27/ytt.jpg",
        
      ],
      desc: "Thin & light, all-day battery, USB-C.",
    },
    
    
  ],

samsung: [
    {
      id: "wt-1",
      name: "Samsung Galaxy A56 5G 12GB",
      price: 194199,
      discount_t: "NONE",
      discount_v: 0,
      rating: 4.2,
      reviews: 92,
      stock_qty: 21,
      images: [
        "/image/products/mobiles/samsung/a56/a56.jpg",
        "/image/products/mobiles/samsung/a56/a56f.jpg",
        "/image/products/mobiles/samsung/a56/a56ff.jpg",
        "/image/products/mobiles/samsung/a56/a56s.jpg",
        

      ],
      desc: "AMOLED, GPS, 7-day battery.",
    },
    {
      id: "wt-1",
      name: "Samsung Galaxy F06 5G 6GB",
      price: 59799,
      discount_t: "NONE",
      discount_v: 0,
      rating: 4.2,
      reviews: 92,
      stock_qty: 21,
      images: [
        "/image/products/mobiles/samsung/f6/f6f.jpg",
        "/image/products/mobiles/samsung/f6/f6b.jpg",
        "/image/products/mobiles/samsung/f6/f6s.jpg",
        "/image/products/mobiles/samsung/f6/f6ss.jpg",
        

      ],
      desc: "AMOLED, GPS, 7-day battery.",
    },
    {
      id: "wt-1",
      name: "Samsung M14 LTE 6GB",
      price: 54499,
      discount_t: "NONE",
      discount_v: 0,
      rating: 4.2,
      reviews: 92,
      stock_qty: 21,
      images: [
        "/image/products/mobiles/samsung/m14/m14f.jpg",
        "/image/products/mobiles/samsung/m14/m14.jpg",
        "/image/products/mobiles/samsung/m14/m14b.jpg",
        "/image/products/mobiles/samsung/m14/m14bs.jpg",
        

      ],
      desc: "AMOLED, GPS, 7-day battery.",
    },

        {
      id: "wt-1",
      name: "Samsung M14 LTE 6GB",
      price: 54499,
      discount_t: "NONE",
      discount_v: 0,
      rating: 4.2,
      reviews: 92,
      stock_qty: 21,
      images: [
        "/image/products/mobiles/samsung/f16/f16f.jpg",
        "/image/products/mobiles/samsung/f16/f16ff.jpg",
        "/image/products/mobiles/samsung/f16/f16b.jpg",
        "/image/products/mobiles/samsung/f16/f16s.jpg",
        

      ],
      desc: "AMOLED, GPS, 7-day battery.",
    },
    
  ],
  

  

  
};

/* ---------------- Helpers ---------------- */
const rupee = (n) => `Rs.${Number(n).toLocaleString("en-LK", { minimumFractionDigits: 0 })}`;
const to2 = (n) => Number(n || 0).toFixed(2);
function finalPrice({ price, discount_t, discount_v }) {
  if (discount_t === "PERCENT") return Math.max(0, price - price * (Number(discount_v) / 100));
  if (discount_t === "AMOUNT")  return Math.max(0, price - Number(discount_v));
  return price;
}

/* ---------------- Page (sections stacked vertically) ---------------- */
export default function CategoryProducts() {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(null);

  // Filter per category based on global search
  const filteredByCat = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const result = {};
    for (const cat of CATEGORIES) {
      let arr = DATA[cat.id] || [];
      if (needle) arr = arr.filter((p) => p.name.toLowerCase().includes(needle));
      result[cat.id] = arr;
    }
    return result;
  }, [q]);

  return (
    <div className="catpage">
      {/* Global header + search */}
      <div className="catbar">
        <h1 style={{ fontWeight: 600, fontSize: 22 }}>Categories</h1>
        <input
          className="search"
          placeholder="Search all categories…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {/* Sections rendered one after another */}
      {CATEGORIES.map((cat) => {
        const products = filteredByCat[cat.id] || [];
        if (products.length === 0) return null; // hide empty sections when searching

        return (
          <section key={cat.id} id={cat.id} style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", margin: "8px 0 10px" }}>
              <h2 style={{ fontSize: 20, fontWeight: 600 }}>{cat.name}</h2>
              {/* optional "See all" anchor */}
              <a href={`#${cat.id}`} style={{ fontSize: 13, color: "#6b7280" }}>#{cat.id}</a>
            </div>

            <div className="grid-tiles">
              {products.map((p) => {
                const fp = finalPrice(p);
                const hasDiscount = fp < p.price;
                const off =
                  p.discount_t === "PERCENT"
                    ? `-${p.discount_v}%`
                    : p.discount_t === "AMOUNT"
                    ? `-Rs.${to2(p.discount_v)}`
                    : null;

                return (
                  <article key={p.id} className="tile" onClick={() => setActive(p)}>
                    <div className="tile__img">
                      <img src={p.images[0]} alt={p.name} />
                      {off && <span className="off">{off}</span>}
                    </div>
                    <div className="tile__body">
                      <h3 className="title">{p.name}</h3>
                      <div className="price">
                        <span className="now">{rupee(fp)}</span>
                        {hasDiscount && <span className="old">{rupee(p.price)}</span>}
                      </div>
                      <div className="rating">
                        {"★".repeat(Math.round(p.rating))} <small>({p.reviews})</small>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Quick View modal (unchanged) */}
      {active && <QuickView product={active} onClose={() => setActive(null)} />}
    </div>
  );
}

/* ---------------- Quick View (same as before) ---------------- */
function QuickView({ product, onClose }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [qty, setQty] = useState(1);

  const fp = finalPrice(product);
  const hasDiscount = fp < product.price;
  const pct =
    product.discount_t === "PERCENT"
      ? product.discount_v
      : product.discount_t === "AMOUNT"
      ? Math.round((product.discount_v / product.price) * 100)
      : 0;

  const inStock = (product.stock_qty || 0) > 0;

  return (
    <div className="qv-backdrop">
      <div className="qv-modal">
        <div className="qv-head">
          <div className="cat"></div>
          <button className="qv-close" onClick={onClose}>✕</button>
        </div>

        <div className="qv-grid">
          <div>
            <div className="qv-hero"><img src={product.images[imgIndex]} alt={product.name} /></div>
            <div className="qv-thumbs">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  className={`qv-thumb ${i===imgIndex ? "qv-thumb--active" : ""}`}
                  onClick={() => setImgIndex(i)}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="qv-title">{product.name}</h2>

            <div className="qv-price">
              {hasDiscount && <div className="old">{rupee(product.price)}</div>}
              <div className="big">{rupee(fp)}</div>
              {pct > 0 && <span className="qv-pill">{pct}% off</span>}
            </div>

            <div className="option-label">QUANTITY</div>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div className="qty">
                <button onClick={() => setQty((n) => Math.max(1, n - 1))}>−</button>
                <div className="val">{qty}</div>
                <button onClick={() => setQty((n) => Math.min(99, n + 1))}>+</button>
              </div>
              <div className="stock">{inStock ? `${product.stock_qty} in stock` : "Out of stock"}</div>
            </div>

            <div style={{ display:"flex", gap:12, marginTop:14 }}>
              <button className="btn" onClick={() => alert("Buy Now (mock)")} disabled={!inStock}>Buy Now</button>
              <button className="btn btn-primary" onClick={() => alert(`Added ${qty} to cart (mock)`)} disabled={!inStock}>Add to Cart</button>
            </div>

            <p style={{ marginTop:16 }}>{product.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
