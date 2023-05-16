import mapboxgl from "mapbox-gl";
import ViewPort from "../../ViewPort";

export default function getCurrentViewPort(map: mapboxgl.Map) {
  const zoom = map.getZoom();
  const { lng, lat } = map.getCenter();

  return new ViewPort(lng, lat, zoom);
}
