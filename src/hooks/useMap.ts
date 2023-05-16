import IMapProps from "../interfaces/IMapProps";
import React, { useRef } from "react";
import mapboxgl from "mapbox-gl";
import useViewPortChanging from "./useViewPortChanging";
import preloadMapboxPlugins from "../lib/utilites/preloadMapboxPlugins";
import getStyleURL from "../lib/utilites/getStyleURL";
import normalizeBounds from "../lib/utilites/normalizeBounds";
import useEvents from "./useEvents";

const useMap = ({
  lng,
  lat,
  token,
  zoom,
  bounds,
  onIdle,
  cdnUrl,
  baseApiUrl,
  onMoveStart,
  fitBoundsOptions,
  styleName = "parsimap-streets-v11",
  ...rest
}: IMapProps) => {
  const map = useRef<mapboxgl.Map>();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const container = React.useRef<null | HTMLDivElement>(null);
  useViewPortChanging(lng, lat, zoom, rest.onViewPortChange, map.current);
  useEvents(rest);

  React.useEffect(() => {
    // get the rtl plugin
    preloadMapboxPlugins(cdnUrl);
  }, [cdnUrl]);

  React.useEffect(() => {
    if (!map.current || !styleName) {
      return;
    }

    const style = getStyleURL(styleName, token, baseApiUrl);
    map.current.setStyle(style, { diff: true });
  }, [baseApiUrl, styleName, token]);

  React.useEffect(() => {
    if (!map.current || !bounds) {
      return;
    }

    const data = normalizeBounds(bounds);

    if (!data) {
      throw new Error("The bounds is not correct");
    }

    map.current.fitBounds(bounds, fitBoundsOptions);
  }, [bounds, fitBoundsOptions, map]);

  // The main map creation
  React.useEffect(() => {
    if (map.current) {
      return;
    }

    const options: mapboxgl.MapboxOptions = {
      container: container.current!,
    };

    if (zoom) {
      options.zoom = zoom;
    }

    if (bounds) {
      options.bounds = bounds;
    }

    if (lng & lat) {
      options.center = new mapboxgl.LngLat(lng, lat);
    }

    if (styleName) {
      options.style = getStyleURL(styleName, token, baseApiUrl);
    }

    map.current = new mapboxgl.Map(options);
  }, [baseApiUrl, bounds, lat, lng, styleName, token, zoom]);

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
  }, [map]);

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
