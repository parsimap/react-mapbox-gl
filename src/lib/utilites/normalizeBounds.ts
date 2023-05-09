import mapboxgl, { LngLatBoundsLike } from "mapbox-gl";

export default function normalizeBounds(bounds: LngLatBoundsLike) {
  if (Array.isArray(bounds)) {
    const ne = bounds[0] as mapboxgl.LngLatLike;
    const sw = bounds[1] as mapboxgl.LngLatLike;
    return new mapboxgl.LngLatBounds([ne, sw]);
  }

  if (bounds instanceof mapboxgl.LngLatBounds) {
    return bounds;
  }

  return;
}
