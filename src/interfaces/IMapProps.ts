import mapboxgl from "mapbox-gl";
import IMapEvents from "./IMapEvents";
import React from "react";

type MapStyleType = "parsimap-streets-v11" | string;

interface IMapProps
  extends Omit<mapboxgl.MapboxOptions, "container" | "style">,
    IMapEvents {
  lat: number;
  lng: number;
  token: string;
  cdnUrl?: string;
  baseApiUrl?: string;
  mapStyle?: MapStyleType;
  style?: React.CSSProperties;
  bounds?: mapboxgl.LngLatBoundsLike;
  fitBoundsOptions?: mapboxgl.FitBoundsOptions;
}

export default IMapProps;
