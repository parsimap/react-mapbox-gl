import mapboxgl from "mapbox-gl";
import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import IMapProps from "../interfaces/IMapProps";
import useMap from "../hooks/useMap";

const Map: React.FC<React.PropsWithChildren<IMapProps>> = ({
  style,
  ...rest
}) => {
  const { container, map, isLoaded } = useMap(rest);

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
      {isLoaded && (
        <ChildrenWithProps map={map.current}>{rest.children}</ChildrenWithProps>
      )}
    </div>
  );
};

const ChildrenWithProps = ({
  children,
  map,
}: React.PropsWithChildren<{
  map?: mapboxgl.Map;
}>) => {
  if (!map) return null;

  return (
    <React.Fragment>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            map,
          } as React.HtmlHTMLAttributes<{
            map: mapboxgl.Map;
          }>);
        }

        return null;
      })}
    </React.Fragment>
  );
};

export default Map;
