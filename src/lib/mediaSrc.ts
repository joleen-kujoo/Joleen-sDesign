/** Encode local public paths (Chinese, +, spaces) for reliable CDN URLs. */
export function mediaSrc(path: string | undefined): string {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const q = path.indexOf("?");
  const pathname = q >= 0 ? path.slice(0, q) : path;
  const search = q >= 0 ? path.slice(q) : "";
  const encoded = pathname
    .split("/")
    .map((seg) => {
      if (!seg) return "";
      try {
        return encodeURIComponent(decodeURIComponent(seg));
      } catch {
        return encodeURIComponent(seg);
      }
    })
    .join("/");
  return encoded + search;
}
