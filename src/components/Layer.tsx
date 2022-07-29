import mapboxgl from "mapbox-gl";
import useLoadEvent from "../hooks/useLoadEvent";
import { IMapViewFeatureProps } from "../index";
import React from "react";

interface IProps extends IMapViewFeatureProps {}

const Layer = ({ _map, ...rest }: IProps & mapboxgl.AnyLayer) => {
  useLoadEvent(() => {
    if (_map?.getLayer(rest.id)) return;
    _map?.addLayer(rest);
  }, _map);

  return <React.Fragment></React.Fragment>;
};

export default Layer;
