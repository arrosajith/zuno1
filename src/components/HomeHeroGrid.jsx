import MainCarousel from "./MainCarousel.jsx";

/* Paths you have in /public (change names if yours differ) */
const leftPromos = [
  { label: "Best Sellers", img: "/image/banners/best.png", href: "/products?sort=best" },
  { label: "New Arrivals", img: "/image/banners/na.png", href: "/products?sort=new" },
  { label: "ZUNO Collections", img: "/image/banners/c.png", href: "/products?collection=zuno" },
];

const rightPromos = [
  { label: "Best Sellers", img: "/image/banners/best.png", href: "/products?sort=best" },
  { label: "New Arrivals", img: "/image/banners/na.png", href: "/products?sort=new" },
  { label: "ZUNO Collections", img: "/image/banners/c.png", href: "/products?collection=zuno" },
];

/* Main carousel slides — uses your banner images; add more if you like */
const slides = [
  "/image/banners/x.png",
  "/image/banners/d.png",
  "/image/banners/o.png", // add this file or remove this line
];

export default function HomeHeroGrid() {
  return (
    <section className="hs-hero">
      {/* Left stacked promos (desktop/tablet) */}
      <div className="hs-col hs-left">
        {leftPromos.map((p, i) => (
          <a key={i} href={p.href} className="hs-card hs-card--left" title={p.label}>
            <img
              src={p.img}
              alt={p.label}
              onError={(e) => { e.currentTarget.src="/image/banners/banner2.jpg"; }}
            />
            <span className="hs-badge">{p.label}</span>
          </a>
        ))}
      </div>

      {/* Center big carousel */}
      <div className="hs-col hs-center">
        <MainCarousel slides={slides} />
      </div>

      {/* Right stacked promos (desktop/tablet) */}
      <div className="hs-col hs-right">
        {rightPromos.map((p, i) => (
          <a key={i} href={p.href} className="hs-card hs-card--right" title={p.label}>
            <img
              src={p.img}
              alt={p.label}
              onError={(e) => { e.currentTarget.src="/image/placeholders/vert.jpg"; }}
            />
            <span className="hs-badge hs-badge--right">{p.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
