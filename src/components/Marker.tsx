import mapboxgl from "mapbox-gl";
import React from "react";
import IMarkerProp from "../interfaces/IMarkerProp";
import { QueueCallbackType } from "../types/QueueCallbackType";

const Marker = ({ map, queue, lngLat }: IMarkerProp) => {
  const marker = React.useRef<mapboxgl.Marker>();

  React.useEffect(() => {
    const callback: QueueCallbackType = (map) => {
      if (!marker.current) {
        marker.current = new mapboxgl.Marker().setLngLat(lngLat).addTo(map);
      }

      marker.current.setLngLat(lngLat);
    };

    if (!map?.isStyleLoaded()) {
      queue!.current[`marker`] = callback;
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
  }, [lngLat, map, queue]);

  return null;
};

export default Marker;
