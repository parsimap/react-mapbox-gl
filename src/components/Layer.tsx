import mapboxgl from "mapbox-gl";
import React from "react";
import ILayerProps from "../interfaces/ILayerProps";
import { QueueCallbackType } from "../types/QueueCallbackType";

type LayoutKeyType = keyof mapboxgl.Layout;
type PaintKeyType = keyof mapboxgl.AnyPaint;
type LayerPropsType = ILayerProps & mapboxgl.AnyLayer;

function updateLayer(
  layer: mapboxgl.Layer,
  layout: mapboxgl.Layout | undefined,
  paint: mapboxgl.AnyPaint | undefined,
  filter: any[] | undefined,
  map: mapboxgl.Map
) {
  if (layout) {
    for (const key in layout) {
      const newValue = layout[key as LayoutKeyType];
      const prevValue = layer.layout?.[key as LayoutKeyType];

      if (prevValue === newValue) {
        continue;
      }

      map.setLayoutProperty(layer.id, key, layout[key as LayoutKeyType]);
    }
  }

  if (paint) {
    for (const key in paint) {
      const prevValue = layer.paint?.[key as PaintKeyType];
      const newValue = paint[key as PaintKeyType];

      if (prevValue === newValue) {
        continue;
      }

      map.setPaintProperty(layer.id, key, paint[key as PaintKeyType]);
    }
  }

  if (filter) {
    map.setFilter(layer.id, filter);
  }
}

function getCallback(
  rest: LayerPropsType,
  layout: mapboxgl.Layout | undefined,
  paint: mapboxgl.AnyPaint | undefined,
  filter: any[] | undefined,
  onClick: ((event: mapboxgl.MapMouseEvent) => void) | undefined
) {
  const layerId = rest.id;

  const callback: QueueCallbackType = (map) => {
    const layer = map.getLayer(layerId);

    if (!layer) {
      map.addLayer(rest);
    } else {
      updateLayer(layer, layout, paint, filter, map);
    }

    if (onClick) {
      map.off("click", layerId, onClick);
      map.on("click", layerId, onClick);
    }
  };

  return callback;
}

const Layer = ({
  map,
  queue,
  onClick,
  styleIsLoaded,
  ...rest
}: LayerPropsType) => {
  React.useEffect(() => {
    if (!map) {
      return;
    }

    const layer = rest as mapboxgl.Layer;
    const { layout, paint, filter, id } = layer;
    const callback = getCallback(rest, layout, paint, filter, onClick);
    const source = map.getSource(layer.source as string);

    if (!styleIsLoaded || !source) {
      queue!.current[`layer:${rest.id},source:${layer.source}`] = callback;
    } else {
      callback(map);
    }

    if (onClick) {
      map.off("click", id, onClick);
      map.on("click", id, onClick);
    }
  }, [map, onClick, queue, rest, styleIsLoaded]);

  return null;
};

export default Layer;
