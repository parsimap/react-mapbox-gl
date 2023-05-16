# react-mapboxgl

> A Library to render mapboxgl mapview with power of parsimap services.

[![NPM](https://img.shields.io/npm/v/@parsimap/react-mapbox-gl.svg)](https://www.npmjs.com/package/@parsimap/react-mapbox-gl) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install @parsimap/react-mapbox-gl
```

## Changelog

**version** `1.1.6`

* The `mapStyle` in `Map` component props, officially can change the style of the map.
* The `style` in `Map` component props, can change the container `CSS` style.

**version** `1.1.5`

* This version can support all options are used in `mapbox-gl` module.
* The problem while the map destroyed was resolved.
* Some improvement are applied.
* The `documentation` is updated in new release version.
* The `Sample.aspx` in the demo is updated.

**version** `1.1.4-beta.5`

* The duplication problem of maps is resolved and destroy was applied.
* Some reason found for unpredictable behaviour for a map view.

**version** `1.1.4-beta.4`

* Second phase review and investigation to find the problem.

**version** `1.1.4-beta.3`

* First phase review and investigation to find the problem.

**version** `1.1.4-beta.2`

* This version including the better event handling and fully support `load` event.

**version** `1.1.4-beta.1`

* This version just released and events is correctly work.

**version** `1.1.4`

* The problem with not-working _map-events_ was resolved.

**version** `1.1.3`

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

Optional Arguments

| title      | type               | default                | description           |
|------------|--------------------|------------------------|-----------------------|
| `mapStyle` | `ParsimapMapStyle` | `parsimap-streets-v11` | The style of the map. |

### Marker

The marker can add a *map-marker* into the **map-view**.

**Arguments**

| title    | type                                                                 | default     | description                                                                                 |
|----------|----------------------------------------------------------------------|-------------|---------------------------------------------------------------------------------------------|
| `lngLat` | [LngLat](https://docs.mapbox.com/mapbox-gl-js/api/geography/#lnglat) | `undefined` | The longitude and latitude of a point such as, [number, number] or {lng:number, lat:number} |

### GeoJSONSource

This component provided an interface for adding geoJSON format file to the map.

**Arguments**

| title  | type                                             | default     | description                                             |
|--------|--------------------------------------------------|-------------|---------------------------------------------------------|
| `id`   | `string`                                         | `undefined` | an unique id determine for identify the source by that. |
| `data` | [GeoJSON](https://en.wikipedia.org/wiki/GeoJSON) | `undefined` | a GeoJSON format data                                   |

### Layer

This component allows adding a feature on the map to describe the feature type
and which type of data that was added by resource could be used, for instance to
illustrate a point feature the `symbol` or `circle` could be suitable.
To see more about layers, you can read [mapbox-gl-js layers](
https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/
).

**Arguments**

| title    | type                                                                       | default     | description                                                    |
|----------|----------------------------------------------------------------------------|-------------|----------------------------------------------------------------|
| `id`     | `string`                                                                   | `undefined` | An unique id to determine for identify the layer               |
| `type`   | [Layer Type](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#type) | `undefined` | The type for a layer which is specifying the shape of feature. |
| `source` | `string`                                                                   | `undefined` | The source should be an existed source                         |

**Optional Arguments**

| title    | type     | default     | description                                 |
|----------|----------|-------------|---------------------------------------------|
| `layout` | `string` | `undefined` | Can determines the layout config of a layer |
| `paint`  | `string` | `undefined` | Can determines the paint config of a layer  |
| `filter` | `string` | `undefined` | Can determines the filter for a layer       |

## Usage

There is a line layer which is created by `streets` source and a circle for each
coordinate of that and a marker which is added to the map in the
defined `lngLat`.

```tsx
import {useState} from "react";
import {
  GeoJSONSource,
  Layer,
  Map,
  Marker,
  ViewPort
} from "@parsimap/react-mapbox-gl";
import mapboxgl from "mapbox-gl";

/**
 * A geoJSON source as a sample data which has a LineString feature.
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
          [51.414, 35.7571]
        ]
      },
      properties: {}
    }
  ]
};

const Sample = () => {
  /**
   * A view port can change current view and zoom of the map.
   */
  const [viewPort, setViewPort] = useState<ViewPort>({
    zoom: 16,
    lng: 51.41,
    lat: 35.7575
  });

  function handleClick(event: mapboxgl.MapMouseEvent) {
    console.log("current lng:", event.lngLat.lng);
    console.log("current lat:", event.lngLat.lat);
  }

  return (
    <Map
      onClick={handleClick}
      onViewPortChange={setViewPort}
      token={"{PMI_TOKEN}"}
      style={"parsimap-streets-v11"}
      {...viewPort}
    >
      <GeoJSONSource id={"streets"} data={sourceData}/>
      <Layer id={"line"} type={"line"} source={"streets"}/>
      <Layer id={"point"} type={"circle"} source={"streets"}/>
      <Marker lngLat={[51.41, 35.7575]}/>
    </Map>
  );
};

export default Sample;
```

## License

MIT © [Parsimap](https://github.com/parsimap)
