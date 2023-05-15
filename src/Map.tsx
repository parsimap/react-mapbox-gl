import mapboxgl from "mapbox-gl";
import React, { useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import normalizeBounds from "./lib/utilites/normalizeBounds";
import ViewPort from "./ViewPort";
import preloadMapboxPlugins from "./lib/utilites/preloadMapboxPlugins";
import getStyleURL from "./lib/utilites/getStyleURL";
import useViewPortChanging from "./hooks/useViewPortChanging";

type PropsType = {
  lat: number;
  lng: number;
  token: string;
  zoom?: number;
  cdnUrl?: string;
  center?: number[];
  onMove?: () => void;
  baseApiUrl?: string;
  styleName?: MapStyleType;
  onMoveStart?: () => void;
  style?: React.CSSProperties;
  bounds?: mapboxgl.LngLatBoundsLike;
  fitBoundsOptions?: mapboxgl.FitBoundsOptions;
  onLoad?: (event: mapboxgl.MapboxEvent) => void;
  onIdle?: (event: mapboxgl.MapboxEvent) => void;
  onData?: (event: mapboxgl.MapDataEvent) => void;
  onViewPortChange?: (viewPort: ViewPort) => void;
  onClick?: (event: mapboxgl.MapMouseEvent) => void;
  onMoveEnd?: (event: mapboxgl.MapboxEvent) => void;
  onStyleLoad?: (event: mapboxgl.MapboxEvent) => void;
};

type MapStyleType = "parsimap-streets-v11" | string;

const useMapView = ({
  lng,
  lat,
  token,
  zoom,
  bounds,
  onIdle,
  cdnUrl,
  onData,
  onLoad,
  onMove,
  onClick,
  onMoveEnd,
  baseApiUrl,
  onMoveStart,
  onStyleLoad,
  onViewPortChange,
  fitBoundsOptions,
  styleName = "parsimap-streets-v11",
}: PropsType) => {
  const map = useRef<mapboxgl.Map>();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const container = React.useRef<null | HTMLDivElement>(null);
  useViewPortChanging(lng, lat, zoom, onViewPortChange, map.current);

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

  /**
   * The all events is defined here
   */
  React.useEffect(() => {
    if (!map.current) {
      return;
    }

    if (onMove) map.current.on("move", onMove);
    if (onLoad) map.current.on("load", onLoad);
    if (onData) map.current.on("data", onData);
    if (onIdle) map.current.on("idle", onIdle);
    if (onClick) map.current.on("click", onClick);
    if (onMoveEnd) map.current.on("moveend", onMoveEnd);
    if (onMoveStart) map.current.on("movestart", onMoveStart);
    if (onStyleLoad) map.current.on("style.load", onStyleLoad);

    return () => {
      if (!map.current) return;

      if (onMove) map.current.on("move", onMove);
      if (onLoad) map.current.off("load", onLoad);
      if (onData) map.current.off("data", onData);
      if (onIdle) map.current.off("idle", onIdle);
      if (onClick) map.current.off("click", onClick);
      if (onMoveEnd) map.current.off("moveend", onMoveEnd);
      if (onMoveStart) map.current.off("movestart", onMoveStart);
      if (onStyleLoad) map.current.off("style.load", onStyleLoad);
    };
  }, [
    map,
    onClick,
    onData,
    onIdle,
    onLoad,
    onMove,
    onMoveEnd,
    onMoveStart,
    onStyleLoad,
    onViewPortChange,
  ]);

  return { container, map, isLoaded };
};

const Map: React.FC<React.PropsWithChildren<PropsType>> = ({
  style,
  ...rest
}) => {
  const { container, map, isLoaded } = useMapView(rest);

  return (
    <div
      ref={container}
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        ...style,
      }}
    >
      {isLoaded && (
        <ChildrenWithProps map={map.current}>{rest.children}</ChildrenWithProps>
      )}
    </div>
  );
};

const ChildrenWithProps = ({
  children,
  map,
}: React.PropsWithChildren<{
  map?: mapboxgl.Map;
}>) => {
  if (!map) return null;

  return (
    <React.Fragment>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            map,
          } as React.HtmlHTMLAttributes<{
            map: mapboxgl.Map;
          }>);
        }

        return null;
      })}
    </React.Fragment>
  );
};

export default Map;
