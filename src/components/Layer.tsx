import mapboxgl from "mapbox-gl";
import React from "react";
import isMapDestroyed from "../lib/utilites/isMapDestroyed";

type PropsType = {
  map?: mapboxgl.Map;
  onClick?: (event: mapboxgl.MapMouseEvent) => {};
} & mapboxgl.AnyLayer;

const Layer = ({ map, onClick, ...rest }: PropsType) => {
  React.useEffect(() => {
    if (!map || isMapDestroyed(map)) {
      return;
    }

    if (map.getLayer(rest.id)) {
      map.removeLayer(rest.id);
    }

    map.addLayer(rest);

    if (onClick) {
      map.on("click", rest.id, onClick);
    }

    return () => {
      if (isMapDestroyed(map)) {
        return;
      }

      if (onClick) {
        map.off("click", rest.id, onClick);
      }

      if (map.getLayer(rest.id)) {
        map.removeLayer(rest.id);
      }
    };
  }, [map, onClick, rest]);

  return null;
};

export default Layer;
