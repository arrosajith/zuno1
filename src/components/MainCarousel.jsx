// frontend/src/components/MainCarousel.jsx
import { useEffect, useRef, useState } from "react";

export default function MainCarousel({ slides = [], interval = 5000 }) {
  const validSlides = (slides || []).filter(Boolean);
  const [i, setI] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    if (validSlides.length <= 1) return;
    timer.current = setInterval(() => setI(v => (v + 1) % validSlides.length), interval);
    return () => clearInterval(timer.current);
  }, [validSlides.length, interval]);

  if (!validSlides.length) return null;

  const prev = () => setI(v => (v - 1 + validSlides.length) % validSlides.length);
  const next = () => setI(v => (v + 1) % validSlides.length);

  return (
    <div className="hs-carousel">
      <button className="hs-arrow hs-arrow--left" onClick={prev} aria-label="Previous">‹</button>

      {/* Use plain <img>; if one slide fails, the others still render */}
      <img
        src={validSlides[i]}
        alt={`banner ${i + 1}`}
        className="hs-slide"
        onError={(e) => { e.currentTarget.src = "/image/placeholders/banner-1600x600.jpg"; }}
      />

      <button className="hs-arrow hs-arrow--right" onClick={next} aria-label="Next">›</button>

      <div className="hs-dots">
        {validSlides.map((_, idx) => (
          <button
            key={idx}
            className={`dot ${i === idx ? "on" : ""}`}
            onClick={() => setI(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
