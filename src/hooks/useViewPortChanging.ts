import ViewPort from "../ViewPort";
import React from "react";
import mapboxgl from "mapbox-gl";

const useViewPortChanging = (
  lng: number,
  lat: number,
  zoom?: number,
  onViewPortChange?: (viewPort: ViewPort) => void,
  map?: mapboxgl.Map
) => {
  const prevZoom = React.useRef<number>();
  const prevLat = React.useRef<number>();
  const prevLng = React.useRef<number>();

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
  }, [zoom, lng, lat, map]);

  React.useEffect(() => {
    if (!map || !onViewPortChange) {
      return;
    }

    function handleMoveEnd() {
      const zoom = map!.getZoom();
      const { lng, lat } = map!.getCenter();

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
    }

    map.on("moveend", handleMoveEnd);

    return () => {
      map.off("moveend", handleMoveEnd);
    };
  }, [map, onViewPortChange]);
};

export default useViewPortChanging;
