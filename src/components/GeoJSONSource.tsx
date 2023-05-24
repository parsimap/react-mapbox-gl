import React from "react";
import mapboxgl from "mapbox-gl";
import IGeoJSONSource from "../interfaces/IGeoJSONSource";
import { QueueCallbackType } from "../types/QueueCallbackType";

type SourceType = mapboxgl.GeoJSONSource | undefined;

const GeoJSONSource = ({
  map,
  queue,
  id,
  data,
  styleIsLoaded,
}: IGeoJSONSource) => {
  React.useEffect(() => {
    const callback: QueueCallbackType = (map) => {
      const source = map?.getSource(id) as SourceType;
      if (source) {
        source.setData(data as any);
      } else {
        map.addSource(id, {
          type: "geojson",
          data,
        });
      }
    };

    if (!map?.isStyleLoaded() || styleIsLoaded) {
      queue!.current[`source:${id}`] = callback;
    } else {
      callback(map);
    }
  }, [map, id, data, queue, styleIsLoaded]);

  return null;
};

export default GeoJSONSource;
