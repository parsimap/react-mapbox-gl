import React from "react";
import mapboxgl from "mapbox-gl";
import isDestroyed from "./lib/utilites/isDestroyed";

type PropsType = {
  id: string;
  map?: mapboxgl.Map;
  data: mapboxgl.GeoJSONSourceRaw["data"];
};

const GeoJSONSource = ({ map, id, data }: PropsType) => {
  React.useEffect(() => {
    if (!map || isDestroyed(map)) {
      return;
    }

    const source = map.getSource(id) as mapboxgl.GeoJSONSource | undefined;

    if (source) {
      source.setData(data as any);
    } else {
      map.addSource(id, {
        type: "geojson",
        data,
      });
    }

    return () => {
      // source?.setData({ type: "FeatureCollection", features: [] });
    };
  }, [map, id, data]);

  return null;
};

export default GeoJSONSource;
