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
  const [map, setMap] = React.useState<mapboxgl.Map>();
  const container = React.useRef<null | HTMLDivElement>(null);
  const prevViewPort = useViewPort(rest, map);
  const queue = React.useRef<QueueMutableRefType["current"]>({});
  const isCreated = React.useRef(false);
  useEvents(rest, prevViewPort, map);

  React.useEffect(() => {
    // get the rtl plugin
    preloadMapboxPlugins(cdnUrl);
  }, [cdnUrl]);

  React.useEffect(() => {
    if (!map?.isStyleLoaded() || !mapStyle) {
      return;
    }

    const style = getStyleURL(mapStyle, token, baseApiUrl);
    map.setStyle(style, { diff: true });
  }, [baseApiUrl, map, mapStyle, token]);

  React.useEffect(() => {
    if (!map?.isStyleLoaded() || !rest.bounds) {
      return;
    }

    const data = normalizeBounds(rest.bounds);

    if (!data) {
      throw new Error("The bounds is not correct");
    }

    map.fitBounds(rest.bounds, rest.fitBoundsOptions);
  }, [rest.fitBoundsOptions, map, rest.bounds]);

  // The main map creation
  React.useEffect(() => {
    if (isCreated.current) {
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

    const newMap = new mapboxgl.Map(options);
    isCreated.current = true;
    setMap(newMap);
  }, [baseApiUrl, map, mapStyle, rest, token]);

  React.useEffect(() => {
    if (!map) {
      return;
    }

    function handleLoad() {
      for (const key in queue.current) {
        if (queue.current[key]) {
          queue.current[key](map!);
          delete queue.current[key];
        }
      }

      setMap(map);
    }

    map.on("load", handleLoad);

    return () => {
      map.off("load", handleLoad);
    };
  }, [map]);

  // React.useEffect(() => {
  //   if (!map) {
  //     return;
  //   }
  //
  //   function handleLoad() {
  //     setIsLoaded(true);
  //   }
  //
  //   map.on("load", handleLoad);
  //
  //   return () => {
  //     map?.off("load", handleLoad);
  //   };
  // }, []);

  // React.useEffect(() => {
  //   if (!map || !isLoaded) {
  //     return;
  //   }
  //
  //   return () => {
  //     // setIsLoaded(false);
  //     // console.log('called?  sss')
  //     // map?.remove();
  //   };
  // }, [isLoaded, map]);

  return { container, map, queue };
};

export default useMap;
