import mapboxgl from "mapbox-gl";

export type MapStyleType =
  | "parsimap-streets-v11"
  | "satellite-raster"
  | "map-raster"
  | mapboxgl.MapboxOptions["style"];
