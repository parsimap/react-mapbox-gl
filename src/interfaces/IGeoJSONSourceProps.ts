import IChildrenProps from "./IChildrenProps";
import mapboxgl from "mapbox-gl";

export default interface IGeoJSONSourceProps extends IChildrenProps {
  id: string;
  cluster?: boolean;
  data: mapboxgl.GeoJSONSourceRaw["data"];
}
