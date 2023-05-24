import mapboxgl from "mapbox-gl";
import { QueueMutableRefType } from "../types/QueueMutableRefType";

export default interface IChildrenProps {
  map?: mapboxgl.Map;
  styleIsLoaded?: boolean;
  queue?: QueueMutableRefType;
}
