import React, { useState } from "react";
import "../styles/Contact.css";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const COMPANY_EMAIL = "sajithbududdhika@gmail.com"; // <-- your address here

  function validate(values) {
    const e = {};
    if (!values.name.trim()) e.name = "Please enter your name";
    if (!values.email.trim()) e.email = "Please enter your email";
    else if (!/^\S+@\S+\.\S+$/.test(values.email)) e.email = "Enter a valid email";
    if (!values.message.trim()) e.message = "Please enter a message";
    return e;
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) return;

    setLoading(true);

    // --- Option A: later, send to your backend ---
    // await fetch('/api/contact', {
    //   method:'POST',
    //   headers:{'Content-Type':'application/json'},
    //   body: JSON.stringify(form)
    // });

    // --- Option B: mailto fallback (works now, no backend needed) ---
    const subject = encodeURIComponent(`Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${COMPANY_EMAIL}?subject=${subject}&body=${body}`;

    // Simulate success UI
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    }, 400);
  }

  return (
    <div className="z-contact">
      {/* HERO */}
      <section className="contact-hero">
        <div className="wrap">
          <h1>
            Contact <span className="brand">ZUNO</span>
          </h1>
          <p className="lead">
            Questions about orders, products, or returns? We’re here to help.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="wrap contact-grid">
        {/* Card: Form */}
        <div className="form card shadow-soft">
          <h2>Send us a message</h2>
          {sent && <div className="notice">Thanks! We’ll get back to you shortly.</div>}
          <form onSubmit={onSubmit} noValidate>
            <div className="field">
              <label>Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your full name"
              />
              {errors.name && <p className="err">{errors.name}</p>}
            </div>

            <div className="field">
              <label>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"  // placeholder is for the visitor's email
              />
              {errors.email && <p className="err">{errors.email}</p>}
            </div>

            <div className="field">
              <label>Message</label>
              <textarea
                rows="6"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="How can we help?"
              />
              {errors.message && <p className="err">{errors.message}</p>}
            </div>

            <div className="actions">
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Sending…" : "Send Message"}
              </button>
            </div>
          </form>
        </div>

        {/* Card: Details */}
        <div className="details card shadow-soft">
          <h3>Contact details</h3>
          <ul className="list">
            <li>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a>
            </li>
            <li><strong>Hotline:</strong> +94 11 234 5678</li>
            <li><strong>WhatsApp:</strong> +94 77 123 4567</li>
            <li><strong>Hours:</strong> Mon–Fri, 9:00–18:00</li>
            <li><strong>Address:</strong> 123 Orange Street, Colombo 04</li>
          </ul>

          <div className="map">
            <img
              src="https://placehold.co/800x380/fff4e5/111?text=ZUNO+HQ+Map"
              alt="ZUNO office map"
            />
          </div>

          <div className="chips">
            <span className="chip">Secure Payments</span>
            <span className="chip">7-Day Returns</span>
            <span className="chip">Island-wide Delivery</span>
          </div>
        </div>
      </section>
    </div>
  );
}
