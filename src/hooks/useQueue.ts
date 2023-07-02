import React from "react";
import mapboxgl from "mapbox-gl";
import { QueueMutableRefType } from "../types/QueueMutableRefType";
import ISourceQueueTask from "../interfaces/ISourceQueueTask";

function runQueueCallbacks(
  tasks: Record<string, ISourceQueueTask>,
  keys: string[],
  map: mapboxgl.Map
) {
  for (const key in tasks) {
    tasks[key].callback(map);
    delete tasks[key];
  }
}

const useQueue = (
  styleIsLoaded: boolean,
  map?: mapboxgl.Map
): QueueMutableRefType => {
  const queue = React.useRef<QueueMutableRefType["current"]>({
    images(map: mapboxgl.Map): void {},
    layers: {},
    sources: {},
    markers: {},
  });

  React.useEffect(() => {
    if (!map) {
      return;
    }

    const keys = Object.keys(queue.current);

    if (!keys.length) {
      return;
    }

    if (styleIsLoaded) {
      runQueueCallbacks(queue.current.sources, keys, map!);
    }

    function handleSourceData(e: mapboxgl.MapSourceDataEvent) {
      // // runQueueCallbacks(
      // //   queue.current.layers,
      // //   queue,
      // //   keys
      // // );
      // console.log(queue.current.layers);
    }

    map.on("sourcedata", handleSourceData);

    return () => {
      map.off("sourcedata", handleSourceData);
    };
  }, [map, styleIsLoaded]);

  return queue;
};

export default useQueue;
