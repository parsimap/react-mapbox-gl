import React, { useRef } from "react";
import mapboxgl from "mapbox-gl";
import useLoadEvent from "../hooks/useLoadEvent";
import { IMapViewFeatureProps } from "../index";

interface IProps extends IMapViewFeatureProps {
  lngLat?: mapboxgl.LngLatLike;
}

const Marker = ({ _map, lngLat }: IProps) => {
  const containerRef = useRef<mapboxgl.Marker>();
  useLoadEvent(() => {
    if (!lngLat) return;
    containerRef.current?.remove();
    containerRef.current = new mapboxgl.Marker().setLngLat(lngLat);
    containerRef.current?.addTo(_map!);
  }, _map);

  return <React.Fragment />;
};

export default Marker;
