import mapboxgl from "mapbox-gl";
import ViewPort from "../ViewPort";

export default interface IMapEvents {
  onMove?: () => void;
  onMoveStart?: () => void;
  onLoad?: (event: mapboxgl.MapboxEvent) => void;
  onIdle?: (event: mapboxgl.MapboxEvent) => void;
  onData?: (event: mapboxgl.MapDataEvent) => void;
  onViewPortChange?: (viewPort: ViewPort) => void;
  onClick?: (event: mapboxgl.MapMouseEvent) => void;
  onMoveEnd?: (event: mapboxgl.MapboxEvent) => void;
  onStyleLoad?: (event: mapboxgl.MapboxEvent) => void;
}
