import mapboxgl from "mapbox-gl";

export default function isMapDestroyed(map: mapboxgl.Map) {
  return !document.contains(map.getCanvasContainer());
}
