import Layer from "./Layer";
import ILayerProps from "../interfaces/ILayerProps";
import mapboxgl from "mapbox-gl";
import React from "react";

type LineLayerPropsType = ILayerProps & Omit<mapboxgl.FillLayer, "type">;

const FillLayer = (props: LineLayerPropsType) => (
  <Layer type={"fill"} {...props} />
);

export default FillLayer;
