import mapboxgl from "mapbox-gl";
import React from "react";

type PropsType = {
  map?: mapboxgl.Map;
  onClick?: (event: mapboxgl.MapMouseEvent) => {};
} & mapboxgl.AnyLayer;

const Layer = ({ map, onClick, ...rest }: PropsType) => {
  React.useEffect(() => {
    const layer = map?.getLayer(rest.id);
    const source = (rest as mapboxgl.Layer).source as string;

    if (!layer && source) {
      map!.addLayer(rest);
    }

    if (onClick) {
      map!.on("click", rest.id, onClick);
    }

    return () => {
      if (onClick) {
        map!.off("click", rest.id, onClick);
      }

      if (layer) {
        map!.removeLayer(rest.id);
      }
    };
  }, [map, onClick, rest]);

  return null;
};

export default Layer;
