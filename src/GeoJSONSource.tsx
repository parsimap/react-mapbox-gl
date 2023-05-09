import React from "react";
import mapboxgl from "mapbox-gl";

type PropsType = {
  id: string;
  map?: mapboxgl.Map;
  data: mapboxgl.GeoJSONSourceRaw["data"];
};

const GeoJSONSource = ({ map, id, data }: PropsType) => {
  React.useEffect(() => {
    const source = map?.getSource(id) as mapboxgl.GeoJSONSource | undefined;

    if (source) {
      source.setData(data as any);
      return;
    }

    map!.addSource(id, {
      type: "geojson",
      data,
    });

    return () => {};
  }, [map, id]);

  return null;
};

export default GeoJSONSource;
