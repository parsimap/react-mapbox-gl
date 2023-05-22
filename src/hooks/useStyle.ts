import React from "react";
import getStyleURL from "../lib/utilites/getStyleURL";
import IMapProps from "../interfaces/IMapProps";
import mapboxgl from "mapbox-gl";

const useStyle = (
  { mapStyle, baseApiUrl, token }: IMapProps,
  map?: mapboxgl.Map
) => {
  React.useEffect(() => {
    if (!map?.isStyleLoaded() || !mapStyle) {
      return;
    }

    const style = getStyleURL(mapStyle, token, baseApiUrl);
    map.setStyle(style, { diff: true });
  }, [baseApiUrl, map, mapStyle, token]);
};

export default useStyle;
