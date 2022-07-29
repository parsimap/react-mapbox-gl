import mapboxgl from "mapbox-gl";

const useLoadEvent = (onLoad: () => void, map?: mapboxgl.Map) => {
  map?.on("load", onLoad);

  return () => {
    map?.off("load", onLoad);
  };
};

export default useLoadEvent;
