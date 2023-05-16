export default function getStyleURL(
  name: string,
  token: string,
  baseApiUrl = "https://api.parsimap.ir"
) {
  const url = new URL(baseApiUrl);
  url.pathname += `styles/${name}`;
  if (token) url.searchParams.append("key", token);
  url.searchParams.append("service", String(true));

  return url.toString();
}
