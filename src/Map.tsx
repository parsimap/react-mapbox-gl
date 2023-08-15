import mapboxgl from "mapbox-gl";
import React, { useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import normalizeBounds from "./lib/utilites/normalizeBounds";
import ViewPort from "./ViewPort";

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

const getStyleURL = (
  name: string,
  token: string,
  baseApiUrl = "https://api.parsimap.ir"
) => {
  const url = new URL(baseApiUrl);
  url.pathname += `/styles/${name}`;
  if (token) url.searchParams.append("key", token);
  url.searchParams.append("service", String(true));
  return url.toString();
};

const preloadMapboxPlugins = (cdnUrl = "https://cdn.parsimap.ir") => {
  if (mapboxgl.getRTLTextPluginStatus() === "unavailable") {
    mapboxgl.setRTLTextPlugin(
      `${cdnUrl}/third-party/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js`,
      () => {}
    );
  }
};

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
  const prevZoom = React.useRef<number>();
  const prevLat = React.useRef<number>();
  const prevLng = React.useRef<number>();
  const mapRef = React.useRef<mapboxgl.Map>();
  const [isStyleLoaded, setIsStyleLoaded] = React.useState(false);
  const containerRef = React.useRef<null | HTMLDivElement>(null);
  const map = mapRef.current;

  React.useEffect(() => {
    // get the rtl plugin
    preloadMapboxPlugins(cdnUrl);
  }, []);

  React.useEffect(() => {
    if (!map || !styleName) {
      return;
    }

    const style = getStyleURL(styleName, token, baseApiUrl);
    map.setStyle(style, { diff: true });
  }, [styleName, token]);

  React.useEffect(() => {
    if (
      !map ||
      (prevZoom.current === zoom &&
        prevLng.current === lng &&
        prevLat.current === lat)
    ) {
      return;
    }

    if (zoom) {
      map.setZoom(zoom);
    }

    if (lng && lat) {
      map.setCenter({ lng, lat });
    }
  }, [zoom, lng, lat]);

  React.useEffect(() => {
    if (!map || !bounds) {
      return;
    }

    const data = normalizeBounds(bounds);

    if (!data) {
      throw new Error("The bounds is not correct");
    }

    map.fitBounds(bounds, fitBoundsOptions);
  }, [bounds]);

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

    const newMap = new mapboxgl.Map(options);
    mapRef.current = newMap;

    function handleMoveEnd(event: mapboxgl.MapboxEvent) {
      const zoom = newMap.getZoom();
      const { lng, lat } = newMap.getCenter();

      if (
        !(
          prevLat.current === lat &&
          prevLng.current === lng &&
          prevZoom.current === zoom
        )
      ) {
        const viewPort: ViewPort = { lng, lat, zoom };
        onViewPortChange?.(viewPort);
      }

      onMoveEnd?.(event);
    }

    function handleStyleLoaded(event: mapboxgl.MapboxEvent) {
      setIsStyleLoaded(true);
      onStyleLoad?.(event);
    }

    newMap.on("moveend", handleMoveEnd);
    newMap.on("load", handleStyleLoaded);

    if (onData) newMap.on("data", onData);
    if (onMove) newMap.on("move", onMove);
    if (onIdle) newMap.once("idle", onIdle);
    if (onLoad) newMap.on("load", onLoad);
    if (onClick) newMap.on("click", onClick);
    if (onMoveStart) newMap.on("movestart", onMoveStart);

    return () => {
      newMap.off("moveend", handleMoveEnd);
      newMap.off("style.load", handleStyleLoaded);

      if (onMove) newMap.on("move", onMove);
      if (onLoad) newMap.off("load", onLoad);
      if (onData) newMap.off("data", onData);
      if (onClick) newMap.off("click", onClick);
      if (onMoveStart) newMap.off("movestart", onMoveStart);
      if (onStyleLoad) newMap.off("style.load", onStyleLoad);
    };
  }, [
    lat,
    lng,
    zoom,
    bounds,
    onData,
    onIdle,
    onMove,
    onClick,
    onLoad,
    onMoveEnd,
    onMoveStart,
    onStyleLoad,
    isStyleLoaded,
    onViewPortChange,
  ]);

  /**
   * The all events is defined here
   */
  useEffect(() => {}, []);

  return { containerRef, mapRef, isStyleLoaded };
};

const Map: React.FC<React.PropsWithChildren<PropsType>> = ({
  style,
  ...rest
}) => {
  const { containerRef, mapRef, isStyleLoaded } = useMapView(rest);

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
      {isStyleLoaded && (
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
