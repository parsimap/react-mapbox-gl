import mapboxgl from "mapbox-gl";
import React from "react";
import normalizeBounds from "../lib/utilites/normalizeBounds";
import IMapProps from "../interfaces/IMapProps";

const useBounds = (
  { bounds, fitBoundsOptions }: IMapProps,
  map?: mapboxgl.Map
) => {
  React.useEffect(() => {
    if (!map?.isStyleLoaded() || !bounds) {
      return;
    }

    const data = normalizeBounds(bounds);

    if (!data) {
      throw new Error("The bounds is not correct");
    }

    map.fitBounds(bounds, fitBoundsOptions);
  }, [bounds, fitBoundsOptions, map]);
};

export default useBounds;
