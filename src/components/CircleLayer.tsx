import Layer from "./Layer";
import ILayerProps from "../interfaces/ILayerProps";
import mapboxgl from "mapbox-gl";
import React from "react";

type LineLayerPropsType = ILayerProps & Omit<mapboxgl.CircleLayer, "type">;

const CircleLayer = (props: LineLayerPropsType) => (
  <Layer type={"circle"} {...props} />
);

export default CircleLayer;
