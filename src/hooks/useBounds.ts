import mapboxgl from "mapbox-gl";
import React, { useRef } from "react";
import IMapProps from "../interfaces/IMapProps";
import { QueueMutableRefType } from "../types/QueueMutableRefType";
import toBoundsArray from "../lib/utilites/toBoundsArray";
import { BoundsTuple } from "../types/BoundsTuple";

const isEquals = (bounds1: BoundsTuple, bounds2: BoundsTuple) =>
  bounds1.every((ll, idx) => ll === bounds2[idx]);

const useBounds = (
  { bounds: propsBounds, fitBoundsOptions }: IMapProps,
  styleIsLoaded: boolean,
  queue?: QueueMutableRefType,
  map?: mapboxgl.Map,
) => {
  const prevBounds = useRef<BoundsTuple>();

  React.useEffect(() => {
    if (!propsBounds || !map || !styleIsLoaded) {
      return;
    }

    const bounds = toBoundsArray(propsBounds) as BoundsTuple;

    if (prevBounds.current && isEquals(prevBounds.current, bounds)) {
      return;
    }

    prevBounds.current = bounds;
    map.fitBounds(propsBounds, fitBoundsOptions);
  }, [propsBounds, styleIsLoaded, fitBoundsOptions, map, queue]);
};

export default useBounds;
