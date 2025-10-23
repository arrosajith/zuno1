import React, { useEffect, useMemo, useState } from "react";

/**
 * AdminInventoryPage
 * - All-in-one inventory admin: list + filters + CRUD + buy lines + history.
 * - Expects backend routes mounted at /api/admin/inventory (see server side we built).
 * - Uses Tailwind utility classes for layout; replace with your CSS if needed.
 */
export default function AdminInventoryPage() {
  // table data + meta
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({ page: 1, limit: 20, total: 0 });
  const [loading, setLoading] = useState(false);

  // filters & sorting
  const [q, setQ] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [active, setActive] = useState("all"); // all | true | false
  const [discT, setDiscT] = useState(""); // '', PERCENT, AMOUNT, NONE
  const [sort, setSort] = useState("updated_desc");
  const [page, setPage] = useState(1);

  // modals / drawers
  const [edit, setEdit] = useState(null); // product object or null
  const [historyFor, setHistoryFor] = useState(null); // product id | null
  const [buyFor, setBuyFor] = useState(null); // product id | null

  // debounce search
  const dq = useDebounce(q, 300);

  async function load(p = page) {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(p),
      limit: String(meta.limit || 20),
      sort,
    });
    if (dq) params.set("search", dq);
    if (categoryId) params.set("category_id", categoryId);
    if (active !== "all") params.set("active", active);
    if (discT) params.set("discount_t", discT);

    const res = await fetch(`/api/admin/inventory?${params.toString()}`, {
      credentials: "include",
    });
    if (!res.ok) {
      setRows([]);
      setMeta((m) => ({ ...m, page: 1, total: 0 }));
      setLoading(false);
      return;
    }
    const json = await res.json();
    setRows(json.data);
    setMeta({ page: json.page, limit: json.limit, total: json.total });
    setLoading(false);
  }

  useEffect(() => { load(1); }, [dq, categoryId, active, discT, sort]);
  useEffect(() => { load(page); }, [page]);

  // optional live polling
  useEffect(() => {
    const t = setInterval(() => load(page), 7000);
    return () => clearInterval(t);
  }, [page, dq, categoryId, active, discT, sort]);

  const pages = useMemo(() => Math.max(1, Math.ceil((meta.total || 0) / (meta.limit || 20))), [meta]);

  async function saveProduct(p) {
    const isEdit = !!p.id;
    const url = isEdit ? `/api/admin/inventory/products/${p.id}` : `/api/admin/inventory/products`;
    const res = await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name: p.name,
        description: p.description || "",
        image_url: p.image_url || "",
        category_id: p.category_id ? Number(p.category_id) : null,
        price: Number(p.price),
        discount_t: p.discount_t || null,
        discount_v: p.discount_v ? Number(p.discount_v) : null,
        is_active: p.is_active ?? true,
      }),
    });
    if (!res.ok) return alert("Save failed");
    setEdit(null);
    load(page);
  }

  async function deactivate(id) {
    if (!window.confirm("Deactivate this product?")) return;
    const res = await fetch(`/api/admin/inventory/products/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) load(page);
  }

  async function addBuyLine(productId, { quantity, unit_price }) {
    const res = await fetch(`/api/admin/inventory/products/${productId}/buy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ quantity: Number(quantity), unit_price: Number(unit_price) }),
    });
    if (!res.ok) return alert("Failed to add buy line");
    setBuyFor(null);
    load(page);
  }

  return (
    <div className="p-6 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Inventory Admin</h1>
        <button
          className="bg-black text-white px-3 py-2 rounded"
          onClick={() => setEdit({
            id: null,
            name: "",
            description: "",
            image_url: "",
            category_id: "",
            price: 0,
            discount_t: null,
            discount_v: 0,
            is_active: true,
          })}
        >
          + New Product
        </button>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <input
          className="border px-3 py-2 rounded"
          placeholder="Search name/category…"
          value={q}
          onChange={(e) => { setQ(e.target.value); setPage(1); }}
        />
        <input
          className="border px-3 py-2 rounded w-40"
          placeholder="Category ID"
          value={categoryId}
          onChange={(e) => { setCategoryId(e.target.value); setPage(1); }}
        />
        <select
          className="border px-3 py-2 rounded"
          value={active}
          onChange={(e) => { setActive(e.target.value); setPage(1); }}
        >
          <option value="all">All</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
        <select
          className="border px-3 py-2 rounded"
          value={discT}
          onChange={(e) => { setDiscT(e.target.value); setPage(1); }}
        >
          <option value="">Discount: Any</option>
          <option value="PERCENT">Percent</option>
          <option value="AMOUNT">Amount</option>
          <option value="NONE">No discount</option>
        </select>
        <select
          className="border px-3 py-2 rounded"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="updated_desc">Updated ⬇</option>
          <option value="name_asc">Name ⬆</option>
          <option value="name_desc">Name ⬇</option>
          <option value="stock_desc">Stock ⬇</option>
          <option value="final_price_asc">Final Price ⬆</option>
          <option value="final_price_desc">Final Price ⬇</option>
          <option value="sold_desc">Sold ⬇</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-auto border rounded">
        <table className="min-w-[1200px] w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th align="right">Price</Th>
              <Th align="center">Discount</Th>
              <Th align="right">Final</Th>
              <Th align="right">Stock</Th>
              <Th align="right">Avg Buy</Th>
              <Th align="right">Sold</Th>
              <Th>Last Sold</Th>
              <Th>Updated</Th>
              <Th align="right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={12} className="p-4">Loading…</td></tr>
            )}
            {!loading && rows.map((r) => (
              <tr key={r.id} className="border-t">
                <Td>
                  {r.image_url ? (
                    <img src={r.image_url} alt="" className="w-12 h-12 object-cover rounded" />
                  ) : (
                    "-"
                  )}
                </Td>
                <Td>
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs text-gray-500">{r.description?.slice(0, 70)}</div>
                </Td>
                <Td>{r.category_name || r.category_id || "-"}</Td>
                <Td align="right">{to2(r.price)}</Td>
                <Td align="center">{r.discount_t ? `${r.discount_t} ${r.discount_v}` : "—"}</Td>
                <Td align="right" className="font-semibold">{to2(r.final_price)}</Td>
                <Td align="right" className={r.stock_qty <= r.low_stock_threshold ? "text-red-600 font-semibold" : ""}>{r.stock_qty}</Td>
                <Td align="right">{to2(r.avg_buy_price || 0)}</Td>
                <Td align="right">{r.total_sold}</Td>
                <Td>{r.last_sold_at ? new Date(r.last_sold_at).toLocaleString() : "-"}</Td>
                <Td>{new Date(r.updated_at).toLocaleString()}</Td>
                <Td align="right" className="space-x-2">
                  <button className="underline" onClick={() => setHistoryFor(r.id)}>History</button>
                  <button className="underline" onClick={() => setBuyFor(r.id)}>+ Buy</button>
                  <button className="underline" onClick={() => setEdit(r)}>Edit</button>
                  <button className="underline text-red-600" onClick={() => deactivate(r.id)}>
                    {r.is_active ? "Disable" : "Disabled"}
                  </button>
                </Td>
              </tr>
            ))}
            {!loading && rows.length === 0 && (
              <tr><td colSpan={12} className="p-4">No records.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Page {meta.page} of {pages} • {meta.total} items
        </div>
        <div className="space-x-2">
          <button className="border px-2 py-1 rounded" disabled={page <= 1} onClick={() => setPage(1)}>«</button>
          <button className="border px-2 py-1 rounded" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>‹</button>
          <button className="border px-2 py-1 rounded" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>›</button>
          <button className="border px-2 py-1 rounded" disabled={page >= pages} onClick={() => setPage(pages)}>»</button>
        </div>
      </div>

      {/* Edit modal */}
      {edit && (
        <Modal title={edit.id ? "Edit Product" : "New Product"} onClose={() => setEdit(null)}>
          <FormRow label="Name">
            <input className="border p-2 w-full" value={edit.name} onChange={(e) => setEdit({ ...edit, name: e.target.value })} />
          </FormRow>
          <FormRow label="Description">
            <textarea className="border p-2 w-full" rows={3} value={edit.description || ""} onChange={(e) => setEdit({ ...edit, description: e.target.value })} />
          </FormRow>
          <FormRow label="Image URL">
            <input className="border p-2 w-full" value={edit.image_url || ""} onChange={(e) => setEdit({ ...edit, image_url: e.target.value })} />
          </FormRow>
          <div className="grid grid-cols-3 gap-3">
            <FormRow label="Category ID">
              <input className="border p-2 w-full" value={edit.category_id || ""} onChange={(e) => setEdit({ ...edit, category_id: e.target.value })} />
            </FormRow>
            <FormRow label="Price">
              <input type="number" className="border p-2 w-full" value={edit.price} onChange={(e) => setEdit({ ...edit, price: e.target.value })} />
            </FormRow>
            <FormRow label="Discount Type">
              <select className="border p-2 w-full" value={edit.discount_t || ""} onChange={(e) => setEdit({ ...edit, discount_t: e.target.value || null })}>
                <option value="">None</option>
                <option value="PERCENT">PERCENT</option>
                <option value="AMOUNT">AMOUNT</option>
              </select>
            </FormRow>
            <FormRow label="Discount Value">
              <input type="number" className="border p-2 w-full" value={edit.discount_v || 0} onChange={(e) => setEdit({ ...edit, discount_v: e.target.value })} />
            </FormRow>
            <FormRow label="Active">
              <select className="border p-2 w-full" value={edit.is_active ? "true" : "false"} onChange={(e) => setEdit({ ...edit, is_active: e.target.value === "true" })}>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </FormRow>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button className="px-3 py-2" onClick={() => setEdit(null)}>Cancel</button>
            <button className="bg-black text-white px-3 py-2 rounded" onClick={() => saveProduct(edit)}>Save</button>
          </div>
        </Modal>
      )}

      {/* Add buy line modal */}
      {buyFor && (
        <Modal title="Add Buying Details" onClose={() => setBuyFor(null)}>
          <BuyForm onSubmit={(data) => addBuyLine(buyFor, data)} />
        </Modal>
      )}

      {/* History drawer */}
      {historyFor && (
        <HistoryDrawer productId={historyFor} onClose={() => setHistoryFor(null)} />
      )}
    </div>
  );
}

/* -------------------- small UI/helpers -------------------- */
function useDebounce(value, ms = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);
  return v;
}

function to2(n) {
  const x = Number(n || 0);
  if (Number.isNaN(x)) return "0.00";
  return x.toFixed(2);
}

function Th({ children, align = "left" }) {
  return (
    <th className={`p-2 text-${align}`}>{children}</th>
  );
}
function Td({ children, align = "left" }) {
  return (
    <td className={`p-2 ${align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left"}`}>{children}</td>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg w-[720px] max-w-[95vw]">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

function FormRow({ label, children }) {
  return (
    <label className="block mb-3">
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      {children}
    </label>
  );
}

function BuyForm({ onSubmit }) {
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  return (
    <div>
      <FormRow label="Quantity">
        <input className="border p-2 w-full" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </FormRow>
      <FormRow label="Unit Price">
        <input className="border p-2 w-full" type="number" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} />
      </FormRow>
      <div className="flex justify-end gap-2">
        <button
          className="bg-black text-white px-3 py-2 rounded"
          onClick={() => onSubmit({ quantity, unit_price: unitPrice })}
        >
          Add
        </button>
      </div>
    </div>
  );
}

function HistoryDrawer({ productId, onClose }) {
  const [items, setItems] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/admin/inventory/products/${productId}/history`, { credentials: "include" });
      const json = await res.json();
      setItems(json);
    })();
  }, [productId]);

  return (
    <div className="fixed inset-0 flex z-50">
      <div className="flex-1" onClick={onClose} />
      <div className="w-[480px] max-w-[90vw] bg-white border-l shadow-xl p-4 overflow-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">History (Sales & Buys)</h3>
          <button onClick={onClose}>✕</button>
        </div>
        {!items && <div>Loading…</div>}
        {items && items.length === 0 && <div>No history.</div>}
        {items && items.length > 0 && (
          <ul className="space-y-2">
            {items.map((it) => (
              <li key={`${it.kind}-${it.id}`} className="border rounded p-2">
                <div className="text-xs text-gray-500">{new Date(it.at).toLocaleString()}</div>
                <div className="font-medium">{it.kind === "SALE" ? "Sold" : "Bought"} • Qty {it.quantity} @ {to2(it.unit_price)}</div>
                <div className="text-sm">Line Total: {to2(it.line_total)}</div>
                {it.kind === "SALE" && it.customer_id && <div className="text-xs">Customer: {it.customer_id}</div>}
                {it.kind === "BUY" && it.supplier_id && <div className="text-xs">Supplier: {it.supplier_id}</div>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
