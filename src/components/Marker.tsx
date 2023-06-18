import mapboxgl from "mapbox-gl";
import React from "react";
import IMarkerProps from "../interfaces/IMarkerProps";
import { QueueCallbackType } from "../types/QueueCallbackType";

const Marker = ({ map, queue, lngLat, color }: IMarkerProps) => {
  const taskId = React.useRef<string>(`marker:${new Date().getTime()}`);
  const marker = React.useRef<mapboxgl.Marker>();

  React.useEffect(() => {
    const callback: QueueCallbackType = (map) => {
      if (!lngLat) {
        marker.current?.remove();
        return;
      }

      if (marker.current) {
        marker.current.remove();
      }

      marker.current = new mapboxgl.Marker({ color })
        .setLngLat(lngLat)
        .addTo(map);
    };

    if (!map?.isStyleLoaded()) {
      queue!.current[taskId.current] = callback;
    } else {
      callback(map);
    }

    return () => {
      marker.current?.remove();
    };
  }, [color, lngLat, map, queue]);

  return null;
};

export default Marker;
