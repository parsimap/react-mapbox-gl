import mapboxgl from "mapbox-gl";
import React from "react";
import ILayerProps from "../interfaces/ILayerProps";
import { QueueCallbackType } from "../types/QueueCallbackType";

type LayerPropsType = ILayerProps & mapboxgl.AnyLayer;

const Layer = ({
  map,
  queue,
  onClick,
  styleIsLoaded,
  ...rest
}: LayerPropsType) => {
  React.useEffect(() => {
    // const { layout, paint, filter } = rest as mapboxgl.Layer;

    const callback: QueueCallbackType = (map) => {
      map.addLayer(rest);

      // if (!map.getLayer(rest.id)) {
      //   map.addLayer(rest);
      // } else {
      //   if (layout) {
      //     for (const layoutKey in layout) {
      //       map.setLayoutProperty(
      //         rest.id,
      //         layoutKey,
      //         layout[layoutKey as keyof typeof layout]
      //       );
      //     }
      //   }
      //
      //   if (paint) {
      //     for (const key in paint) {
      //       map.setPaintProperty(
      //         rest.id,
      //         key,
      //         paint[key as keyof typeof paint]
      //       );
      //     }
      //   }
      //
      //   if (filter) {
      //     map.setFilter(rest.id, filter);
      //   }
      // }

      if (onClick) {
        map.off("click", rest.id, onClick);
        map.on("click", rest.id, onClick);
      }
    };

    if (!map?.isStyleLoaded() || !styleIsLoaded) {
      queue!.current[`layer:${rest.id}`] = callback;
    } else {
      callback(map);
    }

    return () => {
      if (onClick && map?.isStyleLoaded()) {
        map.off("click", rest.id, onClick);
      }

      if (map?.getLayer(rest.id)) {
        map?.removeLayer(rest.id);
      }
    };
  }, [map, onClick, queue, rest, styleIsLoaded]);

  return null;
};

export default Layer;
