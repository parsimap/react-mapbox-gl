import mapboxgl from "mapbox-gl";
import React from "react";

type PropsType = {
  map?: mapboxgl.Map;
  lngLat: mapboxgl.LngLatLike;
};

const Marker = ({ map, lngLat }: PropsType) => {
  const marker = React.useRef<mapboxgl.Marker>();

  React.useEffect(() => {
    if (!lngLat) {
      marker.current?.remove();
      return;
    }

    marker.current = new mapboxgl.Marker().setLngLat(lngLat);
    marker.current?.addTo(map!);

    return () => {
      marker.current?.remove();
    };
  }, [lngLat, map]);

  return null;
};

export default Marker;
