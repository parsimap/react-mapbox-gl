import mapboxgl from "mapbox-gl";
import ViewPort from "../../ViewPort";
import getCurrentViewPort from "./getCurrentViewPort";

export default function matchCurrentViewPortWith(
  map: mapboxgl.Map,
  { lng, lat, zoom }: ViewPort
) {
  const cur = getCurrentViewPort(map);

  return {
    hasSameZoom: cur.zoom === zoom,
    hasSameLngLat: cur.lng && lng && cur.lat === lat,
  };
}
