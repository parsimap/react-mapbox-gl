import IMapProps from "../interfaces/IMapProps";
import React from "react";
import mapboxgl from "mapbox-gl";
import useViewPort from "./useViewPort";
import preloadMapboxPlugins from "../lib/utilites/preloadMapboxPlugins";
import getStyleURL from "../lib/utilites/getStyleURL";
import normalizeBounds from "../lib/utilites/normalizeBounds";
import useEvents from "./useEvents";
import { QueueMutableRefType } from "../types/QueueMutableRefType";

const useMap = ({
  token,
  cdnUrl,
  mapStyle,
  baseApiUrl,
  ...rest
}: Omit<IMapProps, "style">) => {
  const map = React.useRef<mapboxgl.Map>();
  const container = React.useRef<null | HTMLDivElement>(null);
  const queue = React.useRef<QueueMutableRefType["current"]>({});
  const prevViewPort = useViewPort(rest, map.current);
  useEvents(rest, prevViewPort, map.current);

  React.useEffect(() => {
    // get the rtl plugin
    preloadMapboxPlugins(cdnUrl);
  }, [cdnUrl]);

  React.useEffect(() => {
    if (!map.current?.isStyleLoaded() || !mapStyle) {
      return;
    }

    const style = getStyleURL(mapStyle, token, baseApiUrl);
    map.current.setStyle(style, { diff: true });
  }, [baseApiUrl, mapStyle, token]);

  React.useEffect(() => {
    if (!map.current?.isStyleLoaded() || !rest.bounds) {
      return;
    }

    const data = normalizeBounds(rest.bounds);

    if (!data) {
      throw new Error("The bounds is not correct");
    }

    map.current.fitBounds(rest.bounds, rest.fitBoundsOptions);
  }, [rest.fitBoundsOptions, map, rest.bounds]);

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

    function handleLoad() {
      for (const key in queue.current) {
        if (queue.current[key]) {
          queue.current[key](map.current!);
          delete queue.current[key];
        }
      }
    }

    map.current.on("load", handleLoad);
  }, [baseApiUrl, mapStyle, rest, token]);

  // React.useEffect(() => {
  //   if (!map.current) {
  //     return;
  //   }
  //
  //   function handleLoad() {
  //     setIsLoaded(true);
  //   }
  //
  //   map.current.on("load", handleLoad);
  //
  //   return () => {
  //     map.current?.off("load", handleLoad);
  //   };
  // }, []);

  React.useEffect(() => {
    return () => {
      // map.current?.remove();
    };
  }, [map]);

  return { container, map, queue };
};

export default useMap;
