import { useEffect, useState } from "react";
import "../styles/banner.css";

const imgs = ["/image/banners/banner1.jpg", "/image/banners/banner2.jpg"];

export default function BannerSlider() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const allow = window.matchMedia?.("(prefers-reduced-motion: no-preference)")?.matches;
    if (!allow) return;
    const id = setInterval(() => setI(v => (v + 1) % imgs.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="banner">
      <div className="banner__viewport">
        <img
          className="banner__img"
          src={imgs[i]}
          alt="Promotional banner"
          fetchpriority="high"
        />
      </div>
    </div>
  );
}
