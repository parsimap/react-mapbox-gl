import IMapProps from "../interfaces/IMapProps";
import React, { useRef } from "react";
import mapboxgl from "mapbox-gl";
import useViewPort from "./useViewPort";
import preloadMapboxPlugins from "../lib/utilites/preloadMapboxPlugins";
import getStyleURL from "../lib/utilites/getStyleURL";
import normalizeBounds from "../lib/utilites/normalizeBounds";
import useEvents from "./useEvents";

const useMap = ({
  token,
  cdnUrl,
  mapStyle,
  baseApiUrl,
  ...rest
}: Omit<IMapProps, "style">) => {
  const map = useRef<mapboxgl.Map>();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const container = React.useRef<null | HTMLDivElement>(null);
  const prevViewPort = useViewPort(rest, map.current);
  useEvents(rest, prevViewPort, map.current);

  React.useEffect(() => {
    // get the rtl plugin
    preloadMapboxPlugins(cdnUrl);
  }, [cdnUrl]);

  React.useEffect(() => {
    if (!map.current || !mapStyle || !isLoaded) {
      return;
    }

    const style = getStyleURL(mapStyle, token, baseApiUrl);
    map.current.setStyle(style, { diff: true });
  }, [baseApiUrl, isLoaded, mapStyle, token]);

  React.useEffect(() => {
    if (!map.current || !rest.bounds || !isLoaded) {
      return;
    }

    const data = normalizeBounds(rest.bounds);

    if (!data) {
      throw new Error("The bounds is not correct");
    }

    map.current.fitBounds(rest.bounds, rest.fitBoundsOptions);
  }, [rest.fitBoundsOptions, isLoaded, map, rest.bounds]);

  // The main map creation
  React.useEffect(() => {
    if (map.current) {
      return;
    }

    const options: mapboxgl.MapboxOptions = {
      container: container.current!,
      ...rest,
    };

    if (rest.lng & rest.lat) {
      options.center = new mapboxgl.LngLat(rest.lng, rest.lat);
    }

    options.style = getStyleURL(
      mapStyle ?? "parsimap-streets-v11",
      token,
      baseApiUrl
    );

    map.current = new mapboxgl.Map(options);
  }, [baseApiUrl, mapStyle, rest, token]);

  React.useEffect(() => {
    if (!map.current) {
      return;
    }

    function handleLoad() {
      setIsLoaded(true);
    }

    map.current.on("load", handleLoad);

    return () => {
      map.current?.off("load", handleLoad);
    };
  }, []);

  React.useEffect(() => {
    if (!map.current || !isLoaded) {
      return;
    }

    return () => {
      setIsLoaded(false);
      map.current?.remove();
    };
  }, [isLoaded, map]);

  return { container, map, isLoaded };
};

export default useMap;
