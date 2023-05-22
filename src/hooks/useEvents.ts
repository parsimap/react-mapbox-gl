import IMapEvents from "../interfaces/IMapEvents";
import React from "react";
import mapboxgl from "mapbox-gl";
import ViewPort from "../ViewPort";

const useEvents = (
  {
    onData,
    onIdle,
    onLoad,
    onClick,
    onMove,
    onMoveEnd,
    onStyleLoad,
    onMoveStart,
    onViewPortChange,
  }: IMapEvents,
  prevViewPort: React.MutableRefObject<ViewPort | undefined>,
  map?: mapboxgl.Map
) => {
  React.useEffect(() => {
    if (!map) {
      return;
    }

    if (onMove) {
      map.on("move", onMove);
    }

    return () => {
      if (onMove) {
        map.off("move", onMove);
      }
    };
  }, [map, onMove]);

  React.useEffect(() => {
    if (!map) {
      return;
    }

    if (onLoad) {
      map.on("load", onLoad);
    }

    return () => {
      if (onLoad) {
        map.off("load", onLoad);
      }
    };
  }, [map, onLoad]);

  React.useEffect(() => {
    if (!map) {
      return;
    }

    if (onData) {
      map.on("data", onData);
    }

    return () => {
      if (onData) {
        map.off("data", onData);
      }
    };
  }, [map, onData]);

  React.useEffect(() => {
    if (!map) {
      return;
    }

    if (onIdle) {
      map.on("idle", onIdle);
    }

    return () => {
      if (onIdle) {
        map.off("idle", onIdle);
      }
    };
  }, [map, onIdle]);

  React.useEffect(() => {
    if (!map) {
      return;
    }

    if (onClick) {
      map.on("click", onClick);
    }

    return () => {
      if (onClick) {
        map.off("click", onClick);
      }
    };
  }, [map, onClick]);

  React.useEffect(() => {
    if (!map) {
      return;
    }

    if (onMoveEnd) {
      map.on("moveend", onMoveEnd);
    }

    return () => {
      if (onMoveEnd) {
        map.off("moveend", onMoveEnd);
      }
    };
  }, [map, onMoveEnd]);

  React.useEffect(() => {
    if (!map) {
      return;
    }

    if (onMoveStart) {
      map.on("movestart", onMoveStart);
    }

    return () => {
      if (onMoveStart) {
        map.off("movestart", onMoveStart);
      }
    };
  }, [map, onMoveStart]);

  React.useEffect(() => {
    if (!map) {
      return;
    }

    if (onStyleLoad) {
      map.on("style.load", onStyleLoad);
    }

    return () => {
      if (onStyleLoad) {
        map.off("style.load", onStyleLoad);
      }
    };
  }, [map, onStyleLoad]);

  React.useEffect(() => {
    if (!map || !onViewPortChange) {
      return;
    }

    function handleMoveEnd() {
      if (!map) {
        return;
      }

      const zoom = map.getZoom();
      const { lng, lat } = map.getCenter();
      const prev = prevViewPort.current;

      onViewPortChange?.({ lng, lat, zoom });

      if (!prev) {
        prevViewPort.current = new ViewPort(lng, lat, zoom);
        // onViewPortChange?.(prevViewPort.current);
        return;
      }

      if (prev.lng !== lng || prev.lat !== lat || prev.zoom !== zoom) {
        prevViewPort.current = new ViewPort(lng, lat, zoom);
        // onViewPortChange?.(prevViewPort.current);
      }
    }

    map.on("moveend", handleMoveEnd);

    return () => {
      map.off("moveend", handleMoveEnd);
    };
  }, [map, onViewPortChange, prevViewPort]);
};

export default useEvents;
