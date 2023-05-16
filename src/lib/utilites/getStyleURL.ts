export default function getStyleURL(
  name: string,
  token: string,
  baseApiUrl = "https://api.parsimap.ir"
) {
  const url = new URL(baseApiUrl);

  if (url.pathname === "/") {
    url.pathname = `styles/${name}`;
  } else {
    url.pathname += `/styles/${name}`;
  }

  if (token) url.searchParams.append("key", token);
  url.searchParams.append("service", String(true));

  return url.toString();
}
