import IChildrenProps from "./IChildrenProps";
import mapboxgl from "mapbox-gl";

export default interface IGeoJSONSource extends IChildrenProps {
  id: string;
  data: mapboxgl.GeoJSONSourceRaw["data"];
}
