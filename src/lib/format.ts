export function formatMoney(v: string | number | undefined): string {
  if (v === "" || v == null) return "—";
  const n = parseFloat(String(v));
  if (Number.isNaN(n)) return String(v);
  return n >= 1000 ? `$${(n / 1000).toFixed(1)}K` : `$${n.toFixed(0)}`;
}
