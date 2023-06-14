import Layer from "./Layer";
import ILayerProps from "../interfaces/ILayerProps";
import mapboxgl from "mapbox-gl";
import React from "react";

type LineLayerPropsType = ILayerProps & Omit<mapboxgl.HeatmapLayer, "type">;

const HeatmapLayer = (props: LineLayerPropsType) => (
  <Layer type={"heatmap"} {...props} />
);

export default HeatmapLayer;
