import mapboxgl from "mapbox-gl";
import React from "react";
import isDestroyed from "./lib/utilites/isDestroyed";

type PropsType = {
  map?: mapboxgl.Map;
  onClick?: (event: mapboxgl.MapMouseEvent) => {};
} & mapboxgl.AnyLayer;

const Layer = ({ map, onClick, ...rest }: PropsType) => {
  React.useEffect(() => {
    if (!map || isDestroyed(map)) {
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
      if (isDestroyed(map)) {
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
