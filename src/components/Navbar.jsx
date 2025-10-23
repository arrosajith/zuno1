import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getCategories, getProducts } from "../api/api.js";
import { useCart } from "../context/CartContext.jsx";
import "../styles/navbar.css";

/* --- tiny inline icons --- */
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" className="ico" aria-hidden="true">
    <path fill="currentColor" d="M21 20.3 16.7 16a8 8 0 1 0-1.4 1.4L19.6 22 21 20.3zM10 16.5A6.5 6.5 0 1 1 16.5 10 6.51 6.51 0 0 1 10 16.5z"/>
  </svg>
);
const CartIcon = () => (
  <svg viewBox="0 0 24 24" className="ico" aria-hidden="true">
    <path fill="currentColor" d="M7 18a2 2 0 1 0 2 2 2 2 0 0 0-2-2Zm10 0a2 2 0 1 0 2 2 2 2 0 0 0-2-2ZM7.2 14h9.9a2 2 0 0 0 1.9-1.4l2-6A1 1 0 0 0 20 5H6.2L5.6 3.2A1 1 0 0 0 4.7 3H3a1 1 0 0 0 0 2h1l2.6 7.6A2 2 0 0 0 8.2 14Z"/>
  </svg>
);
const MenuIcon = () => (
  <svg viewBox="0 0 24 24" className="ico" aria-hidden="true"><path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"/></svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" className="ico" aria-hidden="true"><path fill="currentColor" d="m6 18 6-6-6-6 1.4-1.4L13.8 10l-6.4 6.4L6 18Zm6 0 6-6-6-6 1.4-1.4L19.8 10l-6.4 6.4L12 18Z" /></svg>
);

export default function Navbar() {
  const navigate = useNavigate();
  const { totalQty = 0 } = useCart() || {};
  const [cats, setCats] = useState([]);
  const [q, setQ] = useState("");
  const [suggest, setSuggest] = useState([]);
  const [openSuggest, setOpenSuggest] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const boxRef = useRef(null);
  const debounceRef = useRef(null);

  /* Load categories from DB */
  useEffect(() => {
    (async () => {
      try {
        const data = await getCategories();
        setCats(Array.isArray(data) ? data : (data?.rows ?? []));
      } catch (e) {
        console.error("categories load failed", e);
      }
    })();
  }, []);

  /* Debounced live product suggestions from DB */
  useEffect(() => {
    if (!q?.trim()) { setSuggest([]); return; }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const rows = await getProducts({ search: q.trim(), limit: 8 });
        setSuggest(Array.isArray(rows) ? rows.slice(0, 8) : []);
        setOpenSuggest(true);
      } catch (e) {
        console.error("search failed", e); setSuggest([]);
      }
    }, 220);
    return () => clearTimeout(debounceRef.current);
  }, [q]);

  /* Close suggestions when clicking outside */
  useEffect(() => {
    const onDoc = (e) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target)) setOpenSuggest(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const topCats = useMemo(() => cats.slice(0, 18), [cats]);

  function submitSearch(e) {
    e?.preventDefault?.();
    const qs = new URLSearchParams();
    if (q.trim()) qs.set("q", q.trim());
    navigate(`/products${qs.toString() ? `?${qs}` : ""}`);
    setOpenSuggest(false);
  }

  function goCategory(c) {
    navigate(`/products?category_id=${c.id}`);
    setMobileOpen(false);
  }

  function goProduct(p) {
    // Navigate to products list filtered by its category (simple),
    // or to product detail page if you have one.
    if (p?.category_id) navigate(`/products?category_id=${p.category_id}&q=${encodeURIComponent(p.name)}`);
    else navigate(`/products?q=${encodeURIComponent(p.name)}`);
    setOpenSuggest(false);
  }

  return (
    <>
      <header className="nav">
        {/* top row */}
        <div className="nav__row">
          {/* mobile menu button */}
          <button className="nav__burger" onClick={() => setMobileOpen(true)} aria-label="Open menu"><MenuIcon/></button>

          {/* logo */}
          <Link to="/" className="nav__logo" aria-label="ZUNO home">
            <img
              src="/image/logo.png"
              alt="ZUNO"
              onError={(e)=>{ e.currentTarget.src="/image/app.png"; }}
            />
          </Link>

          {/* search box */}
          <form className="nav__search" onSubmit={submitSearch} ref={boxRef} role="search">
            <input
              value={q}
              onChange={(e)=>setQ(e.target.value)}
              placeholder="Search products, brands…"
              aria-label="Search products"
              onFocus={()=> q.trim() && setOpenSuggest(true)}
            />
            <button type="submit" className="nav__searchbtn" aria-label="Search"><SearchIcon/></button>

            {/* live suggestions */}
            {openSuggest && suggest.length > 0 && (
              <div className="nav__suggest" role="listbox">
                {suggest.map(s => (
                  <button
                    key={s.id}
                    type="button"
                    className="sug"
                    onClick={() => goProduct(s)}
                    role="option"
                  >
                    <img src={s.image_url || "/image/placeholders/product.png"} alt="" />
                    <div className="meta">
                      <div className="name" title={s.name}>{s.name}</div>
                      <div className="sub">
                        {typeof s.final_price !== "undefined"
                          ? `Rs ${(Number(s.final_price || s.price || 0)).toFixed(2)}`
                          : (s.price ? `Rs ${Number(s.price).toFixed(2)}` : "")}
                      </div>
                    </div>
                  </button>
                ))}
                <button type="button" className="seeall" onClick={submitSearch}>See all results</button>
              </div>
            )}
          </form>

          {/* actions */}
          <div className="nav__acts">
            <a href="tel:+94XXXXXXXXX" className="act">Support</a>
            <span className="act">EN</span>
            <Link to="/cart" className="act cart" aria-label="Cart">
              <CartIcon/>
              {totalQty > 0 && <span className="badge">{totalQty}</span>}
            </Link>
          </div>
        </div>

        {/* bottom row: primary links + category chips */}
        <div className="nav__row nav__row--sub">
          <nav className="nav__links" aria-label="Primary">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/products">Products</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>

          <div className="nav__cats" aria-label="Popular categories">
            {topCats.map(c => (
              <button key={c.id} className="chip" onClick={() => goCategory(c)} title={c.name}>
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`drawer ${mobileOpen ? "open" : ""}`} role="dialog" aria-modal="true">
        <div className="drawer__panel">
          <div className="drawer__hd">
            <span>Menu</span>
            <button className="drawer__close" onClick={()=>setMobileOpen(false)} aria-label="Close menu"><CloseIcon/></button>
          </div>

          <nav className="drawer__links">
            <NavLink to="/" onClick={()=>setMobileOpen(false)}>Home</NavLink>
            <NavLink to="/products" onClick={()=>setMobileOpen(false)}>Products</NavLink>
            <NavLink to="/cart" onClick={()=>setMobileOpen(false)}>Cart</NavLink>
            <NavLink to="/about" onClick={()=>setMobileOpen(false)}>About</NavLink>
            <NavLink to="/contact" onClick={()=>setMobileOpen(false)}>Contact</NavLink>
          </nav>

          <div className="drawer__cats">
            <div className="label">Categories</div>
            <div className="list">
              {cats.map(c => (
                <button key={c.id} onClick={()=>goCategory(c)}>{c.name}</button>
              ))}
            </div>
          </div>
        </div>
        <button className="drawer__backdrop" onClick={()=>setMobileOpen(false)} aria-label="Close"></button>
      </div>
    </>
  );
}
