import React, { useRef } from "react";
import IMapProps from "../interfaces/IMapProps";
import mapboxgl from "mapbox-gl";
import normalizeMapStyle from "../lib/utilites/normalizeMapStyle";

const useStyle = (
  { mapStyle, baseApiUrl, token }: IMapProps,
  map?: mapboxgl.Map
) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const prevMapStyle = React.useRef<mapboxgl.MapboxOptions["style"]>();

  React.useEffect(() => {
    if (!map) {
      return;
    }

    if (typeof mapStyle === "string") {
      if (mapStyle === prevMapStyle.current) {
        return;
      }

      prevMapStyle.current = mapStyle;
    }

    const style = normalizeMapStyle(mapStyle, token, baseApiUrl);

    if (typeof style === "object") {
      if (prevMapStyle.current === style.name) {
        return;
      }

      prevMapStyle.current = style.name;
    }

    map.setStyle(style, { diff: true });
    setIsLoaded(false);
  }, [baseApiUrl, map, mapStyle, token]);

  const timeout = useRef<number>();

  React.useEffect(() => {
    if (!map) {
      return;
    }

    function handleSourceData(e: mapboxgl.MapDataEvent) {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = window.setTimeout(() => {
        if (e.target.isStyleLoaded()) {
          setIsLoaded(true);
        } else {
          setIsLoaded(false);
        }

      }, 200);
    }

    map.on('sourcedata', handleSourceData)

    return () => {
      map.off('sourcedata', handleSourceData)
    };
  }, [map]);

  return isLoaded;
};

export default useStyle;
