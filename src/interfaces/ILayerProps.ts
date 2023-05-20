import mapboxgl from "mapbox-gl";
import IChildrenProps from "./IChildrenProps";

export default interface ILayerProps extends IChildrenProps {
  onClick?: (event: mapboxgl.MapMouseEvent) => {};
}
