import React from "react";
import getStyleURL from "../lib/utilites/getStyleURL";
import IMapProps from "../interfaces/IMapProps";
import mapboxgl from "mapbox-gl";

const useStyle = (
  { mapStyle, baseApiUrl, token }: IMapProps,
  map?: mapboxgl.Map
) => {
  const [isLoaded, setIsLoaded] = React.useState(true);

  React.useEffect(() => {
    if (!map?.isStyleLoaded() || !mapStyle) {
      return;
    }

    const style = getStyleURL(mapStyle, token, baseApiUrl);
    map.setStyle(style);
    setIsLoaded(false);
    setTimeout(() => {
      setIsLoaded(true);
    });

    return () => {
      setIsLoaded(false);
    };
  }, [baseApiUrl, map, mapStyle, token]);

  return isLoaded;
};

export default useStyle;
