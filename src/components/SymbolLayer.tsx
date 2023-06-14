import Layer from "./Layer";
import ILayerProps from "../interfaces/ILayerProps";
import mapboxgl from "mapbox-gl";
import React from "react";

type SymbolLayerPropsType = ILayerProps & Omit<mapboxgl.SymbolLayer, "type">;

const SymbolLayer = (props: SymbolLayerPropsType) => (
  <Layer type={"symbol"} {...props} />
);

export default SymbolLayer;
