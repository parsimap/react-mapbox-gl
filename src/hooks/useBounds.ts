import mapboxgl from "mapbox-gl";
import React, { useRef } from "react";
import IMapProps from "../interfaces/IMapProps";
import { QueueMutableRefType } from "../types/QueueMutableRefType";
import normalizeBounds from "../lib/utilites/normalizeBounds";

const useBounds = (
  { bounds, fitBoundsOptions }: IMapProps,
  styleIsLoaded: boolean,
  queue?: QueueMutableRefType,
  map?: mapboxgl.Map
) => {
  const prevBounds = useRef<[number, number, number, number]>();

  React.useEffect(() => {
    if (!bounds || !map || !styleIsLoaded) {
      return;
    }

    if (prevBounds.current) {
      const boundsArray = normalizeBounds(bounds);
      if (prevBounds.current.every((val, idx) => val === boundsArray[idx])) {
        return;
      }
    }

    map.fitBounds(bounds, fitBoundsOptions);
  }, [bounds, styleIsLoaded, fitBoundsOptions, map, queue]);
};

export default useBounds;
