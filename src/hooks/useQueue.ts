import React from "react";
import mapboxgl from "mapbox-gl";
import { QueueMutableRefType } from "../types/QueueMutableRefType";

const useQueue = (map?: mapboxgl.Map): QueueMutableRefType => {
  const queue = React.useRef<QueueMutableRefType["current"]>({});

  React.useEffect(() => {
    if (!map) {
      return;
    }

    // function handleLoad() {
    //   for (const key in queue.current) {
    //     if (queue.current[key]) {
    //       queue.current[key](map!);
    //       delete queue.current[key];
    //     }
    //   }
    // }

    function handleIdle() {
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

    // map.on("load", handleLoad);
    // map.on("idle", handleIdle);
    map.on("data", handleIdle);

    return () => {
      // map.off("load", handleLoad);
      // map.off("idle", handleIdle);
      map.off("data", handleIdle);
    };
  }, [map]);

  return queue;
};

export default useQueue;
