import React from "react";
import mapboxgl from "mapbox-gl";
import { QueueMutableRefType } from "../types/QueueMutableRefType";

function runQueueCallbacks(
  searchPattern: RegExp,
  queue: QueueMutableRefType,
  keys: string[],
  map: mapboxgl.Map
) {
  for (let i = 0; i <= keys.length; i++) {
    const key = keys[i];

    if (queue.current[key]) {
      if (key.match(searchPattern)) {
        queue.current[key](map);
        delete queue.current[key];
      }
    }
  }
}

const useQueue = (
  styleIsLoaded: boolean,
  map?: mapboxgl.Map
): QueueMutableRefType => {
  const queue = React.useRef<QueueMutableRefType["current"]>({});

  React.useEffect(() => {
    if (!map) {
      return;
    }

    const keys = Object.keys(queue.current);

    if (!keys.length) {
      return;
    }

    if (styleIsLoaded) {
      runQueueCallbacks(/^source:.+/, queue, keys, map!);
    }

    function handleSourceData(e: mapboxgl.MapSourceDataEvent) {
      runQueueCallbacks(new RegExp(`^layer:.+,source:${e.sourceId}`), queue, keys, map!);
    }

    map.on("sourcedata", handleSourceData);

    return () => {
      map.off("sourcedata", handleSourceData);
    };
  }, [map, styleIsLoaded]);

  return queue;
};

export default useQueue;
