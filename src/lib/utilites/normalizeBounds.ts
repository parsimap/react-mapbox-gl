import mapboxgl from "mapbox-gl";

interface IBoundsObject {
  ne: mapboxgl.LngLatLike;
  sw: mapboxgl.LngLatLike;
}

export default function normalizeBounds(bounds: mapboxgl.LngLatBoundsLike) {
  if (bounds instanceof mapboxgl.LngLatBounds) {
    return bounds.toArray();
  }

  if (Array.isArray(bounds) && bounds.length === 4) {
    return bounds;
  }

  if (typeof bounds === "object") {
    if (bounds["sw"] && bounds["ne"]) {
      const updatedBounds = bounds as object as IBoundsObject;
      return new mapboxgl.LngLatBounds(
        updatedBounds.sw,
        updatedBounds.ne
      ).toArray();
    }
  }

  throw new Error("This LngLatBounds is not supported");
}
