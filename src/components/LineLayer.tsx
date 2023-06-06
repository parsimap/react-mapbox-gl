import Layer from "./Layer";
import ILayerProps from "../interfaces/ILayerProps";
import mapboxgl from "mapbox-gl";
import React from "react";

type LineLayerPropsType = ILayerProps & Omit<mapboxgl.LineLayer, "type">;

const LineLayer = (props: LineLayerPropsType) => (
  <Layer type={"line"} {...props} />
);

export default LineLayer;
