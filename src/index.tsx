import mapboxgl from "mapbox-gl";
import React from "react";
import Layer from "./components/Layer";
import Source from "./components/Source";
import Marker from "./components/Marker";

export interface IViewPort {
  zoom: number;
  lat: number;
  lng: number;
}

export interface IMapViewFeatureProps {
  _map?: mapboxgl.Map;
}

interface IMapViewProps {
  lat: number;
  lng: number;
  token: string;
  zoom?: number;
  center?: number[];
  onMove?: () => void;
  styleName?: MapStyleType;
  onMoveStart?: () => void;
  bounds?: mapboxgl.LngLatBoundsLike;
  onIdle?: (event: mapboxgl.MapboxEvent) => void;
  onData?: (event: mapboxgl.MapDataEvent) => void;
  onViewPortChange?: (viewPort: IViewPort) => void;
  onClick?: (event: mapboxgl.MapMouseEvent) => void;
  onMoveEnd?: (event: mapboxgl.MapboxEvent) => void;
  onStyleLoad?: (event: mapboxgl.MapboxEvent) => void;
}

type MapStyleType =
  | "administrative-boundaries"
  | "parsimap-streets-v11"
  | "streets-v11,fttx-coverage"
  | "streets-v11,pop-site"
  | "streets-v11,pop-coverage";

const getStyleURL = (name: string, token: string) => {
  const url = new URL("https://api.parsimap.ir");
  url.pathname += `/styles/${name}`;

  if (token) url.searchParams.append("key", token);
  url.searchParams.append("service", String(true));

  return url.toString();
};

// Mapbox CDN URL to load javascrips and css files of mapbox library
const REACT_APP_CDN_URL = "https://cdn.parsimap.ir/third-party/mapbox-gl-js";

const preloadMapboxPlugins = () => {
  if (mapboxgl.getRTLTextPluginStatus() === "unavailable") {
    mapboxgl.setRTLTextPlugin(
      `${REACT_APP_CDN_URL}/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js`,
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
  onData,
  onMove,
  onClick,
  onMoveEnd,
  onMoveStart,
  onStyleLoad,
  onViewPortChange,
  styleName = "parsimap-streets-v11",
}: IMapViewProps) => {
  const mapRef = React.useRef<mapboxgl.Map>();
  const [, setIsCreated] = React.useState(false);
  const containerRef = React.useRef<null | HTMLDivElement>(null);

  const updateStyle = React.useCallback(() => {
    if (!styleName) return;

    const updatedStyle = getStyleURL(styleName, token);
    mapRef.current?.setStyle(updatedStyle);
  }, [styleName, token]);

  React.useEffect(() => {
    if (mapboxgl.getRTLTextPluginStatus() !== "loaded") {
      preloadMapboxPlugins();
    }
  }, [])

  React.useEffect(() => {
    updateStyle();
  }, [updateStyle, styleName]);

  React.useEffect(() => {
    if (mapRef.current) {
      if (zoom) mapRef.current.setZoom(zoom);
      mapRef.current.setCenter([lng, lat] as mapboxgl.LngLatLike);
    }
  }, [zoom, lng, lat]);

  React.useEffect(() => {
    if (mapRef.current && bounds) {
      mapRef.current?.fitBounds(bounds);
    }
  }, [bounds]);

  React.useEffect(() => {
    if (!mapRef.current) {
      const mapOptions: mapboxgl.MapboxOptions = {
        container: containerRef.current!,
      };

      if (zoom) mapOptions.zoom = zoom;
      if (bounds) mapOptions.bounds = bounds;
      mapOptions.center = [lng, lat] as mapboxgl.LngLatLike;

      mapRef.current = new mapboxgl.Map(mapOptions);
      updateStyle();
      setIsCreated(true);
    }

    const handleMoveEnd = (event: mapboxgl.MapboxEvent) => {
      const zoom = mapRef.current!.getZoom();
      const { lng, lat } = mapRef.current!.getCenter();
      const viewPort: IViewPort = { lng, lat, zoom };
      onViewPortChange?.(viewPort);
      onMoveEnd?.(event);
    };

    mapRef.current.on("moveend", handleMoveEnd);
    if (onData) mapRef.current.on("data", onData);
    if (onMove) mapRef.current?.on("move", onMove);
    if (onIdle) mapRef.current.once("idle", onIdle);
    if (onClick) mapRef.current.on("click", onClick);
    if (onMoveStart) mapRef.current?.on("movestart", onMoveStart);
    if (onStyleLoad) mapRef.current?.on("style.load", onStyleLoad);

    return () => {
      mapRef.current?.off("moveend", handleMoveEnd);
      if (onMove) mapRef.current?.on("move", onMove);
      if (onData) mapRef.current?.off("data", onData);
      if (onClick) mapRef.current?.off("click", onClick);
      if (onMoveStart) mapRef.current?.off("movestart", onMoveStart);
      if (onStyleLoad) mapRef.current?.off("style.load", onStyleLoad);
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
    onMoveEnd,
    onMoveStart,
    onStyleLoad,
    updateStyle,
    onViewPortChange,
  ]);

  return { containerRef, mapRef };
};

const MapView: React.FC<React.PropsWithChildren<IMapViewProps>> = ({ ...rest }) => {
  const { containerRef, mapRef } = useMapView(rest);

  return (
    <div ref={containerRef} style={{ height: "100%", width: "100%" }}>
      {React.Children.map(rest.children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { _map: mapRef.current })
          : undefined
      )}
    </div>
  );
};

export { MapView, Layer, Source, Marker };
