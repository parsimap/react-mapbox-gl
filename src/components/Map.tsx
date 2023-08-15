import React from "react";
import IMapProps from "../interfaces/IMapProps";
import useMap from "../hooks/useMap";
import Children from "./Children";

export default function Map({
  style,
  children,
  ...rest
}: React.PropsWithChildren<IMapProps>) {
  const { container, map, queue, styleIsLoaded } = useMap(rest);

  return (
    <div
      ref={container}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        ...style,
      }}
    >
      {
        <Children map={map} queue={queue} styleIsLoaded={styleIsLoaded}>
          {children}
        </Children>
      }
    </div>
  );
}
