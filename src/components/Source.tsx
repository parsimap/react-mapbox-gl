import mapboxgl, { AnySourceData } from "mapbox-gl";
import useLoadEvent from "../hooks/useLoadEvent";
import { IMapViewFeatureProps } from "../index";
import React from "react";

type SpreadGenericType<T> = {
  [K in keyof T]: T[K];
};

interface IProps extends IMapViewFeatureProps {
  id?: string;
}

const Source = <T extends mapboxgl.AnySourceData>({
  _map,
  id,
  ...rest
}: IProps & SpreadGenericType<T>) => {
  useLoadEvent(() => {
    if (!id || _map?.getSource(id)) return;
    _map?.addSource(id, rest as AnySourceData);
  }, _map);

  return <React.Fragment></React.Fragment>;
};

export default Source;
