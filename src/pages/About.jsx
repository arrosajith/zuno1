import React from "react";
import "../styles/About.css";

export default function About() {
  return (
    <div className="z-about">
      {/* HERO */}
      <section className="about-hero">
        <div className="wrap">
          <h1>About <span className="brand">ZUNO</span></h1>
          <p className="lead">
            We’re a Sri Lankan e-commerce brand focused on great products, fair prices,
            and a smooth checkout experience with PayHere (Visa/Master).
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="about-block">
        <div className="wrap grid2">
          <div>
            <h2>Our Mission</h2>
            <p>
              Make online shopping effortless. From mobiles to home goods, we curate
              quality items and deliver them fast — island-wide.
            </p>
            <ul className="ticks">
              <li>Trusted payments with PayHere</li>
              <li>Fast delivery and reliable support</li>
              <li>Transparent pricing & seasonal discounts</li>
            </ul>
          </div>
          <div className="card-img">
            <img
              src="https://placehold.co/640x420/ffedd5/111?text=ZUNO+Warehouse"
              alt="ZUNO warehouse"
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="about-stats">
        <div className="wrap stats-grid">
          <Stat value="50k+" label="Happy Customers" />
          <Stat value="1,500+" label="Products Listed" />
          <Stat value="24–48h" label="Avg. Delivery Time" />
          <Stat value="4.8/5" label="Customer Rating" />
        </div>
      </section>

      {/* VALUES */}
      <section className="about-block">
        <div className="wrap">
          <h2>What We Value</h2>
          <div className="values">
            <Value
              title="Quality First"
              text="We hand-pick items from trusted suppliers and brands."
            />
            <Value
              title="Fair Pricing"
              text="Simple pricing with clear discounts — no hidden fees."
            />
            <Value
              title="Care & Support"
              text="Friendly support for orders, returns, and warranties."
            />
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="about-block">
        <div className="wrap">
          <h2>Our Journey</h2>
          <ol className="timeline">
            <li>
              <span className="dot" />
              <div>
                <h4>2025 — ZUNO Launch</h4>
                <p>We started with a small catalog and big ambitions.</p>
              </div>
            </li>
            <li>
              <span className="dot" />
              <div>
                <h4>2025 — 1.5k Products</h4>
                <p>Expanded categories and introduced card payments via PayHere.</p>
              </div>
            </li>
            <li>
              <span className="dot" />
              <div>
                <h4>Next — Faster, Greener</h4>
                <p>Optimizing delivery routes and eco-friendly packaging.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="wrap cta-card">
          <div>
            <h2>Got questions?</h2>
            <p>We’re here to help with sizing, specs, or order issues.</p>
          </div>
          <a className="btn-primary" href="/contact">Contact Support</a>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="stat card shadow-soft">
      <div className="value">{value}</div>
      <div className="label">{label}</div>
    </div>
  );
}

function Value({ title, text }) {
  return (
    <div className="value-card card shadow-soft">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}
