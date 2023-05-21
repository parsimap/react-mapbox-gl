import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import IMapProps from "../interfaces/IMapProps";
import useMap from "../hooks/useMap";
import Children from "./Children";

const Map = ({
  children,
  style,
  ...rest
}: React.PropsWithChildren<IMapProps>) => {
  const { container, map, queue } = useMap(rest);

  return (
    <div
      ref={container}
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        ...style,
      }}
    >
      {
        <Children map={map} queue={queue}>
          {children}
        </Children>
      }
    </div>
  );
};


export default Map;
