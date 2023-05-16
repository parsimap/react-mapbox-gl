import mapboxgl from "mapbox-gl";
import React from "react";
import IMapEvents from "./IMapEvents";

type MapStyleType = "parsimap-streets-v11" | string;

interface IMapProps extends Omit<mapboxgl.MapboxOptions, "style">, IMapEvents {
  lat: number;
  lng: number;
  token: string;
  zoom?: number;
  cdnUrl?: string;
  baseApiUrl?: string;
  styleName?: MapStyleType;
  style?: React.CSSProperties;
  bounds?: mapboxgl.LngLatBoundsLike;
  fitBoundsOptions?: mapboxgl.FitBoundsOptions;
}

export default IMapProps;
