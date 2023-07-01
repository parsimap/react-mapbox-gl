import { useState } from "react";
import {
  CircleLayer,
  GeoJSONSource,
  Layer,
  LineLayer,
  Map,
  Marker,
  ViewPort,
} from "@parsimap/react-mapbox-gl";
import mapboxgl from "mapbox-gl";

/**
 * A geoJSON source as sample data which has a LineString feature.
 */
const sourceData: mapboxgl.GeoJSONSourceRaw["data"] = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [51.41, 35.7575],
          [51.413, 35.7573],
          [51.414, 35.7571],
        ],
      },
      properties: {},
    },
  ],
};

const Sample = () => {
  /**
   * A view port can change the current view and zoom of the map.
   */
  const [viewPort, setViewPort] = useState<ViewPort>({
    zoom: 16,
    lng: 51.41,
    lat: 35.7575,
  });

  function handleClick(event: mapboxgl.MapMouseEvent) {
    // console.log("current lng:", event.lngLat.lng);
    // console.log("current lat:", event.lngLat.lat);
    // event.target.remove();
    setViewPort((prev) => ({
      lng: prev.lng,
      lat: prev.lat + 0.01,
      zoom: prev.zoom,
    }));
  }

  function handleLoad() {
    // console.log(e.target.fitBounds([[51.41, 35.7575], [51.411, 35.75751]]));
  }

  console.log(viewPort);

  const [toggle, setToggle] = useState(true);
  const [basemap, setBasemap] = useState<"map-raster" | "sat-raster">(
    "map-raster"
  );

  return (
    <>
      <button
        onClick={() => {
          setToggle((prev) => !prev);
        }}
      >
        Toggle map
      </button>
      <button
        onClick={() => {
          setBasemap(
            basemap === "map-raster" ? "satellite-raster" : "map-raster"
          );
        }}
      >
        toggle basemap
      </button>
      <div style={{ height: "100%" }}>
        {!toggle ? (
          <Map
            onClick={handleClick}
            onViewPortChange={setViewPort}
            token={"ac3fed7ee26d424e9781400f4106dd38"}
            onLoad={handleLoad}
            mapStyle={basemap}
            {...viewPort}
          >
            <GeoJSONSource id={"streets"} data={sourceData} />
            <Layer id={"line"} type={"line"} source={"streets"} />
            <LineLayer id={"line"} source={"streets"} />
            <CircleLayer id={"point"} source={"streets"} />
            <Marker lngLat={[51.41, 35.7575]} />
          </Map>
        ) : (
          <div>stuck!</div>
        )}
      </div>
    </>
  );
};

export default Sample;
