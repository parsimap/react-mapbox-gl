import mapboxgl from "mapbox-gl";
import React from "react";
import IMarkerProps from "../interfaces/IMarkerProps";
import { QueueCallbackType } from "../types/QueueCallbackType";

const Marker = ({ map, queue, lngLat, color }: IMarkerProps) => {
  const taskId = React.useRef<string>(`marker:${new Date().getTime()}`);
  const marker = React.useRef<mapboxgl.Marker>();
  const prevColor = React.useRef<string>();

  React.useEffect(() => {
    const callback: QueueCallbackType = (map) => {
      if (!lngLat) {
        marker.current?.remove();
        return;
      }

      if (!marker.current) {
        marker.current = new mapboxgl.Marker({ color })
          .setLngLat(lngLat)
          .addTo(map);
      } else {
        if (color !== prevColor.current) {
          marker.current = new mapboxgl.Marker({ color })
            .setLngLat(lngLat)
            .addTo(map);
        } else {
          marker.current.setLngLat(lngLat);
        }
      }

      prevColor.current = color;
    };

    if (!map?.isStyleLoaded()) {
      queue!.current.markers[taskId.current] = callback;
    } else {
      callback(map);
    }
  }, [color, lngLat, map, queue]);

  return null;
};

export default Marker;
