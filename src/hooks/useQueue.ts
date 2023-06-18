import React from "react";
import mapboxgl from "mapbox-gl";
import { QueueMutableRefType } from "../types/QueueMutableRefType";

const useQueue = (map?: mapboxgl.Map): QueueMutableRefType => {
  const queue = React.useRef<QueueMutableRefType["current"]>({});

  React.useEffect(() => {
    if (!map) {
      return;
    }

    function updateUI() {
      if (!Object.keys(queue.current).length) {
        return;
      }

      const postponeStacks = [];

      if (!map?.isStyleLoaded()) {
        return;
      }

      for (const key in queue.current) {
        if (queue.current[key]) {
          if (key.startsWith("layer:")) {
            postponeStacks.push(() => {
              queue.current[key](map);
              delete queue.current[key];
            });
          } else {
            queue.current[key](map);
            delete queue.current[key];
          }
        }
      }

      for (const postponeStack of postponeStacks) {
        postponeStack();
      }
    }

    map.on("idle", updateUI);
    map.on("data", updateUI);

    return () => {
      map.off("idle", updateUI);
      map.off("data", updateUI);
    };
  }, [map]);

  return queue;
};

export default useQueue;
