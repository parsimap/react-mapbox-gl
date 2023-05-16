import mapboxgl from "mapbox-gl";
import IMapEvents from "./IMapEvents";
import React from "react";

type StyleType = "parsimap-streets-v11" | string;

interface IMapProps
  extends Omit<mapboxgl.MapboxOptions, "container">,
    IMapEvents {
  lat: number;
  lng: number;
  token: string;
  cdnUrl?: string;
  style?: StyleType;
  baseApiUrl?: string;
  bounds?: mapboxgl.LngLatBoundsLike;
  containerStyle?: React.CSSProperties;
  fitBoundsOptions?: mapboxgl.FitBoundsOptions;
}

export default IMapProps;
