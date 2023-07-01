import mapboxgl from "mapbox-gl";
import React, { useRef } from "react";
import IMapProps from "../interfaces/IMapProps";
import { QueueCallbackType } from "../types/QueueCallbackType";
import { QueueMutableRefType } from "../types/QueueMutableRefType";
import normalizeBounds from "../lib/utilites/normalizeBounds";

const useBounds = (
  { bounds, fitBoundsOptions }: IMapProps,
  map?: mapboxgl.Map,
  queue?: QueueMutableRefType
) => {
  const prevBounds = useRef<[number, number, number, number]>();

  React.useEffect(() => {
    if (!bounds) {
      return;
    }

    if (prevBounds.current) {
      const boundsArray = normalizeBounds(bounds);
      if (prevBounds.current.every((val, idx) => val === boundsArray[idx])) {
        return;
      }
    }

    const callback: QueueCallbackType = (map) => {
      map.fitBounds(bounds, fitBoundsOptions);
    };

    if (!map?.isStyleLoaded()) {
      queue!.current["bounds"] = callback;
    } else {
      callback(map);
    }
  }, [bounds, fitBoundsOptions, map, queue]);
};

export default useBounds;
