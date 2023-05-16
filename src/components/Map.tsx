import mapboxgl from "mapbox-gl";
import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import IMapProps from "../interfaces/IMapProps";
import useMap from "../hooks/useMap";

const Map = ({
  containerStyle,
  children,
  ...rest
}: React.PropsWithChildren<IMapProps>) => {
  const { container, map, isLoaded } = useMap(rest);

  return (
    <div
      ref={container}
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        ...containerStyle,
      }}
    >
      {isLoaded && (
        <ChildrenWithMap map={map.current}>{children}</ChildrenWithMap>
      )}
    </div>
  );
};

const ChildrenWithMap = ({
  children,
  map,
}: React.PropsWithChildren<{
  map?: mapboxgl.Map;
}>) => {
  if (!map) return null;

  return (
    <React.Fragment>
      {React.Children.map(children, (child: any) => {
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
