import mapboxgl from "mapbox-gl";
import React from "react";
import IMarkerProps from "../interfaces/IMarkerProps";
import { QueueCallbackType } from "../types/QueueCallbackType";

const Marker = ({ map, queue, lngLat, color }: IMarkerProps) => {
  const marker = React.useRef<mapboxgl.Marker>();

  React.useEffect(() => {
    const callback: QueueCallbackType = (map) => {
      if (!lngLat) {
        return;
      }

      if (marker.current) {
        marker.current.remove();
      }

      marker.current = new mapboxgl.Marker({ color })
        .setLngLat(lngLat as mapboxgl.LngLatLike)
        .addTo(map);
    };

    if (!map?.isStyleLoaded()) {
      const time = new Date().getTime();
      queue!.current[`marker:${time}`] = callback;
    } else {
      callback(map);
    }

    if (!lngLat) {
      marker.current?.remove();
      return;
    }

    return () => {
      marker.current?.remove();
    };
  }, [color, lngLat, map, queue]);

  return null;
};

export default Marker;
