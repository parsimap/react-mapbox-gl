import mapboxgl from "mapbox-gl";
import IMapEvents from "./IMapEvents";
import React from "react";
import { MapStyleType } from "../types/MapStyleType";

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
}

export default IMapProps;
