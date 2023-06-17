import IChildrenProps from "./IChildrenProps";
import GeoJSON from 'geojson';

export default interface IGeoJSONSourceProps extends IChildrenProps {
  id: string;
  cluster?: boolean;
  data: GeoJSON.FeatureCollection;
}
