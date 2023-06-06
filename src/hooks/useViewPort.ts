import ViewPort from "../ViewPort";
import React from "react";
import mapboxgl from "mapbox-gl";

const useViewPort = (
  { lng, lat, zoom }: Omit<ViewPort, "zoom"> & { zoom?: number },
  map?: mapboxgl.Map
) => {
  const prevViewPort = React.useRef<ViewPort>();

  React.useEffect(() => {
    if (!map) {
      return;
    }

    if (!prevViewPort.current) {
      let newZoom;
      map.setCenter(new mapboxgl.LngLat(lng, lat));

      if (zoom) {
        newZoom = zoom;
        map.setZoom(zoom);
      } else {
        newZoom = map.getZoom();
      }

      prevViewPort.current = new ViewPort(lng, lat, newZoom);
      return;
    }
  }, [zoom, lng, lat, map, prevViewPort]);

  return prevViewPort;
};

export default useViewPort;
