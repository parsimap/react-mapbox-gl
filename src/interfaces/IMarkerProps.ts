import mapboxgl from "mapbox-gl";
import IChildrenProps from "./IChildrenProps";

export default interface IMarkerProps extends IChildrenProps {
  lngLat?: number[] | mapboxgl.LngLat;
  color?: string;
}
