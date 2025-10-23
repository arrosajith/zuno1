// D:\zuno\frontend\src\api\api.js
const API = (import.meta.env.VITE_API_BASE || "http://localhost:5000").replace(/\/+$/, "");

async function fetchJSON(url, { method = "GET", headers = {}, body } = {}) {
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} – ${text}`);
  }
  return res.json();
}

function qs(obj = {}) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined && v !== null && v !== "") sp.append(k, v);
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
}

/* ---------- Orders ---------- */
export const createOrder = (payload) =>
  fetchJSON(`${API}/api/checkout/create-order`, {
    method: "POST",
    body: payload,
  });

/* ---------- Products (grouped list for Products.jsx) ---------- */
export const getProductsGrouped = ({ search = "", category_id } = {}) =>
  fetchJSON(`${API}/api/products/grouped${qs({ q: search, category_id })}`)
    .then((d) => (Array.isArray(d) ? d : []));

/* ---------- Categories (paged + featured + search) ---------- */
export const getCategoriesPaged = ({ limit = 50, offset = 0, q = "", featured = false } = {}) =>
  fetchJSON(`${API}/api/categories${qs({ limit, offset, q, featured })}`);

/* ---------- Categories (basic) ---------- */
export const getCategories = () => fetchJSON(`${API}/api/categories`);
export const getSubcategories = (categoryId) =>
  fetchJSON(`${API}/api/categories/${categoryId}/subcategories`);

/* ---------- Products ---------- */
/** Get products; accepts optional filters for compatibility with both flows */
export const getProducts = ({ search = "", categoryId, limit, offset } = {}) =>
  fetchJSON(`${API}/api/products${qs({ search, categoryId, limit, offset })}`);

/** Legacy helper: now correctly proxies to /api/products with query params */
export const searchProducts = (q, category_id) =>
  fetchJSON(`${API}/api/products${qs({ search: q, categoryId: category_id })}`);

export const getProductById = (id) => fetchJSON(`${API}/api/products/${id}`);

/* ---------- Admin ---------- */
export const getLowStock = () => fetchJSON(`${API}/api/admin/low-stock`);
export const getMonthlySales = (month /* 'YYYY-MM-01' */) =>
  fetchJSON(`${API}/api/admin/sales${qs({ month })}`);

/* ---------- Home page sections (NEW) ---------- */
/**
 * Fetch home sections in one call.
 * Backend should return: { ok:true, data: { categories?, recent, best } }
 * Query params (all optional): { cats, recent, best }
 */
export const getHomeSections = async (params = {}) => {
  const res = await fetchJSON(`${API}/api/home${qs(params)}`);
  return res?.data ?? {};
};

/* Optional single-section helpers (use the combined one above if possible) */
export const getHomeRecent = async (limit = 8) =>
  fetchJSON(`${API}/api/home/recent${qs({ limit })}`).then((r) => r?.data ?? []);
export const getHomeBest = async (limit = 8) =>
  fetchJSON(`${API}/api/home/best${qs({ limit })}`).then((r) => r?.data ?? []);

/* ---------- Default export ---------- */
export default {
  getCategoriesPaged,
  getCategories,
  getSubcategories,
  getProducts,
  searchProducts,
  getProductById,
  getLowStock,
  getMonthlySales,
  getProductsGrouped,
  createOrder,
  getHomeSections,   // NEW
  getHomeRecent,     // optional
  getHomeBest,       // optional
};
