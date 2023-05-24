import React from "react";
import mapboxgl from "mapbox-gl";
import getStyleURL from "../lib/utilites/getStyleURL";
import IMapProps from "../interfaces/IMapProps";

const useInitialization = ({
  token,
  mapStyle,
  baseApiUrl,
  lng,
  lat,
  ...rest
}: Omit<IMapProps, "style">) => {
  const isCreated = React.useRef(false);
  const container = React.useRef<null | HTMLDivElement>(null);
  const [map, setMap] = React.useState<mapboxgl.Map>();

  React.useEffect(() => {
    if (isCreated.current || !container.current) {
      return;
    }

    const options: mapboxgl.MapboxOptions = {
      container: container.current,
      ...rest,
    };

    if (lng & lat) {
      options.center = new mapboxgl.LngLat(lng, lat);
    }

    options.style = getStyleURL(
      mapStyle ?? "parsimap-streets-v11",
      token,
      baseApiUrl
    );

    const newMap = new mapboxgl.Map(options);
    isCreated.current = true;
    setMap(newMap);
  }, [baseApiUrl, container, lat, lng, mapStyle, rest, token]);

  return { map, container };
};

export default useInitialization;
