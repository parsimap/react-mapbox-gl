import mapboxgl from "mapbox-gl";
import React from "react";
import ILayerProps from "../interfaces/ILayerProps";
import { QueueCallbackType } from "../types/QueueCallbackType";

const Layer = ({
  map,
  queue,
  onClick,
  ...rest
}: ILayerProps & mapboxgl.AnyLayer) => {
  React.useEffect(() => {
    const callback: QueueCallbackType = (map) => {
      if (!map.getLayer(rest.id)) {
        map.addLayer(rest);
      }

      if (onClick) {
        map.on("click", rest.id, onClick);
      }
    };

    if (!map?.isStyleLoaded()) {
      queue!.current[`layer:${rest.id}`] = callback;
    } else {
      callback(map);
    }

    return () => {
      if (onClick && map?.isStyleLoaded()) {
        map.off("click", rest.id, onClick);
      }
    };
  }, [map, onClick, queue, rest]);

  return null;
};

export default Layer;
