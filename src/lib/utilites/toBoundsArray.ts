import mapboxgl from "mapbox-gl";
import { BoundsTuple } from "../../types/BoundsTuple";

interface IBoundsObject {
  ne: mapboxgl.LngLatLike;
  sw: mapboxgl.LngLatLike;
}

const toFlat = (bounds: mapboxgl.LngLatBounds) =>
  bounds.toArray().flat() as BoundsTuple;

export default function toBoundsArray(bounds: mapboxgl.LngLatBoundsLike) {
  if (bounds instanceof mapboxgl.LngLatBounds) {
    return toFlat(bounds);
  }

  if (Array.isArray(bounds)) {
    if (bounds.length === 4) {
      return bounds;
    }

    if (bounds.length === 2) {
      const newBounds = new mapboxgl.LngLatBounds(
        bounds[0] as mapboxgl.LngLatLike,
        bounds[1] as mapboxgl.LngLatLike,
      );

      return toFlat(newBounds);
    }
  }

  if (typeof bounds === "object") {
    if (
      Object.getOwnPropertyDescriptor(bounds, "sw") &&
      Object.getOwnPropertyDescriptor(bounds, "ne")
    ) {
      const newBounds = new mapboxgl.LngLatBounds(
        bounds["sw"] as IBoundsObject["sw"],
        bounds["ne"] as IBoundsObject["ne"],
      );

      return toFlat(newBounds);
    }
  }

  throw new Error("This LngLatBounds is not supported");
}
