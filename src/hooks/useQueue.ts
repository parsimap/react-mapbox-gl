import React from "react";
import mapboxgl from "mapbox-gl";
import { QueueMutableRefType } from "../types/QueueMutableRefType";

const useQueue = (
  map?: mapboxgl.Map,
  onLoad?: () => void
): QueueMutableRefType => {
  const queue = React.useRef<QueueMutableRefType["current"]>({});

  React.useEffect(() => {
    if (!map) {
      return;
    }

    function handleLoad() {
      for (const key in queue.current) {
        if (queue.current[key]) {
          queue.current[key](map!);
          delete queue.current[key];
        }
      }

      onLoad?.();
    }

    map.on("load", handleLoad);

    return () => {
      map.off("load", handleLoad);
    };
  }, [map, onLoad]);

  return queue;
};

export default useQueue;
