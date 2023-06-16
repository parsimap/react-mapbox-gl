import mapboxgl from "mapbox-gl";
import IChildrenProps from "./IChildrenProps";

export default interface IMarkerProps extends IChildrenProps {
  lngLat?: mapboxgl.LngLat;
  color?: string;
}
