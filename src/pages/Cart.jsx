import { useMemo, useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { createOrder } from "../api/api.js";
import "../styles/cart.css";

export default function Cart() {
  const { items, updateQty, removeItem, clearCart, subtotal } = useCart();

  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    address: "", city: "", postal_code: ""
  });
  const [shipping, setShipping] = useState("standard"); // standard|express
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const shippingFee = useMemo(() => shipping === "express" ? 750 : (subtotal > 5000 ? 0 : 350), [shipping, subtotal]);
  const discount = useMemo(() => 0, []); // wire later to backend promo
  const tax = useMemo(() => 0, []);      // add VAT if needed
  const total = useMemo(() => Math.max(0, subtotal + shippingFee - discount + tax), [subtotal, shippingFee, discount, tax]);

  function edit(e) { setForm({ ...form, [e.target.name]: e.target.value }); }

  async function handleCheckout() {
    setMsg(""); setLoading(true);
    try {
      // basic validation
      if (!form.name || !form.phone || !form.email || !form.address || !form.city) {
        setMsg("Please fill all required fields."); setLoading(false); return;
      }
      if (!items.length) { setMsg("Your cart is empty."); setLoading(false); return; }

      const payload = {
        customer: form,
        shipping: { method: shipping, fee: shippingFee },
        amounts: { subtotal, discount, tax, shipping: shippingFee, total },
        items: items.map(x => ({
          product_id: x.id, name: x.name, qty: x.qty,
          price: Number(x.price), final_price: Number(x.final_price || x.price),
          size: x.size || null, color: x.color || null
        })),
        coupon: coupon || null,
        // where PayHere should return the user after payment:
        return_url: `${location.origin}/cart?ok=1`,
        cancel_url: `${location.origin}/cart?cancel=1`,
      };

      // Ask backend to create order & get PayHere payload or URL
      const res = await createOrder(payload);

      if (res?.pay_url) {
        // Redirect to a hosted payment page (easiest)
        window.location.href = res.pay_url;
        return;
      }
      if (res?.form) {
        // Or post auto-submitting form (PayHere popup)
        const formHtml = res.form; // backend returns a ready HTML <form> string
        const wrap = document.createElement("div");
        wrap.style.display = "none";
        wrap.innerHTML = formHtml;
        document.body.appendChild(wrap);
        wrap.querySelector("form")?.submit();
        return;
      }

      setMsg("Could not start payment. Please try again.");

    } catch (e) {
      console.error(e);
      setMsg(e.message || "Checkout failed.");
    } finally { setLoading(false); }
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {!items.length && <div className="empty">Your cart is empty.</div>}

      {items.length > 0 && (
        <div className="cart-grid">
          {/* Left: items */}
          <section className="cart-items">
            {items.map(x => (
              <article key={`${x.id}|${x.size}|${x.color}`} className="cart-row">
                <img src={`${x.image_url || "/image/placeholders/product.png"}`} alt={x.name} />
                <div className="info">
                  <h4>{x.name}</h4>
                  <div className="meta">
                    {x.size && <span>Size: {x.size}</span>}
                    {x.color && <span>Color: {x.color}</span>}
                  </div>
                  <div className="price">Rs {(Number(x.final_price || x.price)).toFixed(2)}</div>
                </div>
                <div className="qty">
                  <button onClick={() => updateQty(x, Math.max(1, (x.qty || 1) - 1))}>−</button>
                  <input type="number" min="1" value={x.qty}
                    onChange={(e)=>updateQty(x, Math.max(1, Number(e.target.value||1)))} />
                  <button onClick={() => updateQty(x, (x.qty || 1) + 1)}>+</button>
                </div>
                <div className="line">Rs {((Number(x.final_price || x.price)) * (x.qty || 1)).toFixed(2)}</div>
                <button className="remove" onClick={() => removeItem(x)}>×</button>
              </article>
            ))}

            <div className="cart-actions">
              <button className="ghost" onClick={() => (window.location.href = "/products")}>Continue shopping</button>
              <button className="danger" onClick={clearCart}>Clear cart</button>
            </div>
          </section>

          {/* Right: summary / checkout */}
          <aside className="summary">
            <h3>Order Summary</h3>

            <div className="row"><span>Subtotal</span><b>Rs {subtotal.toFixed(2)}</b></div>

            <label className="coupon">
              <input value={coupon} onChange={(e)=>setCoupon(e.target.value)} placeholder="Coupon code" />
              <button type="button" className="ghost">Apply</button>
            </label>

            <label className="ship">
              <span>Shipping</span>
              <select value={shipping} onChange={(e)=>setShipping(e.target.value)}>
                <option value="standard">Standard {subtotal>5000 ? "(Free)" : "(Rs 350)"}</option>
                <option value="express">Express (Rs 750)</option>
              </select>
            </label>

            <div className="row"><span>Shipping fee</span><b>Rs {shippingFee.toFixed(2)}</b></div>
            {/* Add rows for VAT and Discount when you enable them */}

            <div className="total"><span>Total</span><b>Rs {total.toFixed(2)}</b></div>

            <h4>Customer Details</h4>
            <div className="form">
              <input name="name" value={form.name} onChange={edit} placeholder="Full name *" />
              <input name="phone" value={form.phone} onChange={edit} placeholder="Phone *" />
              <input name="email" value={form.email} onChange={edit} placeholder="Email *" />
              <input name="address" value={form.address} onChange={edit} placeholder="Address *" />
              <div className="row2">
                <input name="city" value={form.city} onChange={edit} placeholder="City *" />
                <input name="postal_code" value={form.postal_code} onChange={edit} placeholder="Postal code" />
              </div>
            </div>

            {msg && <div className="msg">{msg}</div>}

            <button className="primary" disabled={loading || !items.length} onClick={handleCheckout}>
              {loading ? "Processing…" : "Proceed to Payment"}
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
