import { useState } from "react";
import {
  GeoJSONSource,
  Layer,
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
   * A view port can change current view and zoom of the map.
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
  }

  function handleLoad() {
    // console.log(e.target.fitBounds([[51.41, 35.7575], [51.411, 35.75751]]));
  }

  const [toggle, setToggle] = useState(true);

  return (
    <>
      <button
        onClick={() => {
          setToggle((prev) => !prev);
        }}
      >
        Toggle map
      </button>
      <div style={{ height: "100%" }}>
        {!toggle ? (
          <Map
            onClick={handleClick}
            onViewPortChange={setViewPort}
            token={"ac3fed7ee26d424e9781400f4106dd38"}
            onLoad={handleLoad}
            mapStyle={"parsimap-streets-v11"}
            {...viewPort}
          >
            <GeoJSONSource id={"streets"} data={sourceData} />
            <Layer id={"line"} type={"line"} source={"streets"} />
            <Layer id={"point"} type={"circle"} source={"streets"} />
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
