import React from "react";
import mapboxgl from "mapbox-gl";
import IGeoJSONSourceProps from "../interfaces/IGeoJSONSourceProps";
import { QueueCallbackType } from "../types/QueueCallbackType";

type SourceType = mapboxgl.GeoJSONSource | undefined;

const GeoJSONSource = ({
  map,
  queue,
  id,
  data,
  cluster = false,
  styleIsLoaded,
}: IGeoJSONSourceProps) => {
  React.useEffect(() => {
    if (!map) {
      return;
    }

    const callback: QueueCallbackType = (map) => {
      const source = map?.getSource(id) as SourceType;

      if (source) {
        source.setData(data);
      } else {
        map.addSource(id, {
          type: "geojson",
          data,
          cluster,
        });
      }
    };

    if (!styleIsLoaded) {
      queue!.current.sources[id] = { id: id, callback };
    } else {
      callback(map!);
    }
  }, [map, id, data, queue, styleIsLoaded, cluster]);

  return null;
};

export default GeoJSONSource;
