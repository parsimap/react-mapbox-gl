# react-mapboxgl

> A Library to render mapboxgl mapview with power of parsimap services.

[![NPM](https://img.shields.io/npm/v/@parsimap/react-mapbox-gl.svg)](https://www.npmjs.com/package/@parsimap/react-mapbox-gl) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install @parsimap/react-mapbox-gl
```

## Changelog

**Version:** 1.1.3

* The marker was added.
* The layer and source can be added.
* Some problems were resolved.

## Components

### Map

The `Map` is a main component to parenting another components itself, also it
controls or lets a developer know get and set current `ViewPort` of the map.
Furthermore, this component has a verity of events such as `load`, `style.load`
and other [mapbox-gl-js
events](https://docs.mapbox.com/mapbox-gl-js/api/map/#map-events).
It must be mentioned that, to use map tile server, there is a need to replace
the
`PMI_TOKEN` to a
valid [access-token](https://account.parsimap.ir/token-registration).

### Marker

The marker can add a *map-marker* into the **map-view**.

**Arguments**

* `lngLat` the latitude and longitude of a point.

### GeoJSONSource

This component provided an interface for adding geoJSON format file to the map.

* `id` an unique id determine for identify the source by that.
* `data` a GeoJSON format data

### Layer

This component allows adding a feature on the map to describe the feature type
and which type of data that was added by resource could be used, for instance to
illustrate a point feature the `symbol` or `circle` could be suitable.
To see more about layers, you can read [mapbox-gl-js layers](
https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/
).

**Arguments**

* `id` An unique id to determine for identify the layer.
* `type` The type for a layer which is specifying the shape of feature.
* `source` The source should be an existed source.

**Optional Arguments**

* `layout` Can determines the layout config of a layer.
* `paint` Can determines the paint config of a layer.
* `filter` Can determines the filter for a layer.

## Usage

There is a line layer which is created by `streets` source and a circle for each
coordinate of that and a marker which is added to the map in the
defined `lngLat`.

```tsx
import { useState } from "react";
import {
  GeoJSONSource,
  Layer,
  Map,
  Marker,
  ViewPort
} from "@parsimap/react-mapbox-gl";
import mapboxgl from "mapbox-gl";

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
          [51.414, 35.7571]
        ]
      },
      properties: {}
    }
  ]
};

const App = () => {
  const [viewPort, setViewPort] = useState<ViewPort>({
    zoom: 16,
    lng: 51.41,
    lat: 35.7575
  });

  return (
    <Map
      {...viewPort}
      onViewPortChange={setViewPort}
      token={"{PMI_TOKEN}"}
    >
      <GeoJSONSource id={"streets"} data={sourceData} />
      <Layer id={"line"} type={"line"} source={"streets"} />
      <Layer id={"point"} type={"circle"} source={"streets"} />
      <Marker lngLat={[51.41, 35.7575]} />
    </Map>
  );
};

export default App;
```

## License

MIT © [Parsimap](https://github.com/parsimap)
