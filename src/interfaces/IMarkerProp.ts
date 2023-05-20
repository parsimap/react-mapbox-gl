import mapboxgl from "mapbox-gl";
import IChildrenProps from "./IChildrenProps";

export default interface IMarkerProp extends IChildrenProps {
  lngLat: mapboxgl.LngLatLike;
}
