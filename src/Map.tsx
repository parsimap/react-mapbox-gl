import mapboxgl from "mapbox-gl";
import React, { useState } from "react";
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
  const mapRef = React.useRef<mapboxgl.Map>();
  const [isCreated, setIsCreated] = useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const containerRef = React.useRef<null | HTMLDivElement>(null);
  const map = mapRef.current;
  useViewPortChanging(lng, lat, zoom, onViewPortChange, map);

  React.useEffect(() => {
    // get the rtl plugin
    preloadMapboxPlugins(cdnUrl);
  }, [cdnUrl]);

  React.useEffect(() => {
    if (!map || !styleName) {
      return;
    }

    const style = getStyleURL(styleName, token, baseApiUrl);
    map.setStyle(style, { diff: true });
  }, [baseApiUrl, map, styleName, token]);

  React.useEffect(() => {
    if (!map || !bounds) {
      return;
    }

    const data = normalizeBounds(bounds);

    if (!data) {
      throw new Error("The bounds is not correct");
    }

    map.fitBounds(bounds, fitBoundsOptions);
  }, [bounds, fitBoundsOptions, map]);

  // The main map creation
  React.useEffect(() => {
    if (map) {
      return;
    }

    const options: mapboxgl.MapboxOptions = {
      container: containerRef.current!,
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

    mapRef.current = new mapboxgl.Map(options);
    setIsCreated(true);
  }, [baseApiUrl, bounds, lat, lng, map, styleName, token, zoom]);

  React.useEffect(() => {
    if (!isCreated) return;

    function handleLoad() {
      setIsLoaded(true);
    }

    map?.on("load", handleLoad);

    return () => {
      map?.on("load", handleLoad);
    };
  }, [isCreated, map]);

  /**
   * The all events is defined here
   */
  React.useEffect(() => {
    if (!map) {
      return;
    }

    if (onMove) map.on("move", onMove);
    if (onLoad) map.on("load", onLoad);
    if (onData) map.on("data", onData);
    if (onIdle) map.on("idle", onIdle);
    if (onClick) map.on("click", onClick);
    if (onMoveEnd) map.on("moveend", onMoveEnd);
    if (onMoveStart) map.on("movestart", onMoveStart);
    if (onStyleLoad) map.on("style.load", onStyleLoad);

    return () => {
      if (onMove) map.on("move", onMove);
      if (onLoad) map.off("load", onLoad);
      if (onData) map.off("data", onData);
      if (onIdle) map.off("idle", onIdle);
      if (onClick) map.off("click", onClick);
      if (onMoveEnd) map.off("moveend", onMoveEnd);
      if (onMoveStart) map.off("movestart", onMoveStart);
      if (onStyleLoad) map.off("style.load", onStyleLoad);
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

  return { containerRef, mapRef, isLoaded };
};

const Map: React.FC<React.PropsWithChildren<PropsType>> = ({
  style,
  ...rest
}) => {
  const { containerRef, mapRef, isLoaded } = useMapView(rest);

  return (
    <div
      ref={containerRef}
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        ...style,
      }}
    >
      {isLoaded && (
        <ChildrenWithProps map={mapRef.current!}>
          {rest.children}
        </ChildrenWithProps>
      )}
    </div>
  );
};

const ChildrenWithProps = ({
  children,
  map,
}: React.PropsWithChildren<{
  map: mapboxgl.Map;
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
