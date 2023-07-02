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
    const newBounds = bounds as object;

    if ("sw" in newBounds && "ne" in newBounds) {
      const updatedBounds = newBounds as IBoundsObject;
      return new mapboxgl.LngLatBounds(
        updatedBounds.sw,
        updatedBounds.ne
      ).toArray();
    }
  }

  throw new Error("This LngLatBounds is not supported");
}
