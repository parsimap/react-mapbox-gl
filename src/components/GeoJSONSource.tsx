import React from "react";
import mapboxgl from "mapbox-gl";
import IGeoJSONSource from "../interfaces/IGeoJSONSource";
import { QueueCallbackType } from "../types/QueueCallbackType";

type SourceType = mapboxgl.GeoJSONSource | undefined;

const GeoJSONSource = ({ map, queue, id, data }: IGeoJSONSource) => {
  React.useEffect(() => {
    const callback: QueueCallbackType = (map) => {
      const source = map.getSource(id) as SourceType;

      if (source) {
        source.setData(data as any);
      } else {
        map.addSource(id, {
          type: "geojson",
          data,
        });
      }
    };

    if (!map?.isStyleLoaded()) {
      queue!.current[`source:${id}`] = callback;
    } else {
      callback(map);
    }

    return () => {
      // source?.setData({ type: "FeatureCollection", features: [] });
    };
  }, [map, id, data, queue]);

  return null;
};

export default GeoJSONSource;
