import { createContext, useContext, useEffect, useMemo, useState } from "react";
const CartCtx = createContext(null);
const key = "zuno_cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem(key, JSON.stringify(items)); }, [items]);

  const signature = (x) => `${x.id}|${x.size || ""}|${x.color || ""}`;

  function addItem(entry) {
    setItems(prev => {
      const idx = prev.findIndex(x => signature(x) === signature(entry));
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: Math.min((next[idx].qty || 0) + entry.qty, entry.stock || 9999) };
        return next;
      }
      return [...prev, entry];
    });
  }

  function updateQty(entry, qty) {
    qty = Math.max(1, Math.min(qty, entry.stock || 9999));
    setItems(prev => prev.map(x => signature(x) === signature(entry) ? { ...x, qty } : x));
  }

  function removeItem(entry) {
    setItems(prev => prev.filter(x => signature(x) !== signature(entry)));
  }

  function clearCart() { setItems([]); }

  const subtotal = useMemo(
    () => items.reduce((a, x) => a + Number(x.final_price || x.price || 0) * (x.qty || 0), 0),
    [items]
  );

  const totalQty = useMemo(() => items.reduce((a, x) => a + (x.qty || 0), 0), [items]);

  const value = { items, addItem, updateQty, removeItem, clearCart, subtotal, totalQty, setItems };
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
export const useCart = () => useContext(CartCtx);
