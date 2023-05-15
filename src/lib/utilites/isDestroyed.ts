import mapboxgl from "mapbox-gl";

export default function isDestroyed(map: mapboxgl.Map) {
  return !document.contains(map.getCanvasContainer());
}
