import { useState } from "react";
import {
  GeoJSONSource,
  Layer,
  Map,
  Marker,
  ViewPort,
} from "@parsimap/react-mapbox-gl";
import mapboxgl from "mapbox-gl";

const sourceData: mapboxgl.GeoJSONSourceRaw["data"] = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [51.41, 35.7575],
          [51.413, 35.7573],
          [51.414, 35.7571],
        ],
      },
      properties: {},
    },
  ],
};

const App = () => {
  const [viewPort, setViewPort] = useState<ViewPort>({
    zoom: 16,
    lng: 51.41,
    lat: 35.7575,
  });

  return (
    <Map
      {...viewPort}
      onViewPortChange={setViewPort}
      token={"ac3fed7ee26d424e9781400f4106dd38"}
    >
      <GeoJSONSource id={"streets"} data={sourceData} />
      <Layer id={"line"} type={"line"} source={"streets"} />
      <Layer id={"point"} type={"circle"} source={"streets"} />
      <Marker lngLat={[51.41, 35.7575]} />
    </Map>
  );
};

export default App;
