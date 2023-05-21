# react-mapboxgl

> A Library to render mapboxgl mapview with power of parsimap services.

[![NPM](https://img.shields.io/npm/v/@parsimap/react-mapbox-gl.svg)](https://www.npmjs.com/package/@parsimap/react-mapbox-gl) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add @parsimap/react-mapbox-gl
```

# Getting started with React Mapbox GL

- [Changelog](#changelog)
- [Components](#components)
  - [Map](#map)
    - [Map Arguments](#map-arguments)
    - [Map Arguments](#map-optional-arguments)
  - [Marker](#marker)
    - [Marker Arguments](#marker-arguments)
  - [Layer](#layer)
    - [Layer Arguments](#layer-arguments)
    - [Layer Optional Arguments](#layer-optional-arguments)
- [Usage](#usage)
  - [Render Map with features](#render-map-with-features)
  - [Render Map with features](#using-a-created-map-object)

## Changelog

**version** `1.2.1`

- A Problem with update new viewPort was resolved.

**version** `1.1.8`

- The problem with the definition of Layer or Marker and GeoJSONSource were resolved.
- `load` and `style.load` events are worked.
- The problem with `onViewPortChange` was resolved.
- The map component is now stable and can be used.
- The documentation was updated and provided a list for navigation easy to sections.

**version** `1.1.7-beta.1`

- Some minor error was resolved.

**version** `1.1.7`

- Some minor error was resolved.

**version** `1.1.6`

- The `mapStyle` in `Map` component props, officially can change the style of the map.
- The `style` in `Map` component props, can change the container `CSS` style.

**version** `1.1.5`

- This version can support all options are used in `mapbox-gl` module.
- The problem while the map was destroyed was resolved.
- Some improvement are applied.
- The `documentation` is updated in a new release version.
- The `Sample.aspx` in the demo is updated.

**version** `1.1.4-beta.5`

- The duplication problem of maps is resolved and destroy was applied.
- Some reason found for unpredictable behavior for a map view.

**version** `1.1.4-beta.4`

- Second phase review and investigation to find the problem.

**version** `1.1.4-beta.3`

- First phase of review and investigation to find the problem.

**version** `1.1.4-beta.2`

- This version including the better event handling and fully support `load` event.

**version** `1.1.4-beta.1`

- This version just released and events correctly work.

**version** `1.1.4`

- The problem with not-working _map-events_ was resolved.

**version** `1.1.3`

- The marker was added.
- The layer and source can be added.
- Some problems were resolved.

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

#### Map Arguments

| title   | type     | default     | description                                                                     |
|---------|----------|-------------|---------------------------------------------------------------------------------|
| `lng`   | `number` | `undefined` | Define the longitude of center of map.                                          |
| `lat`   | `number` | `undefined` | Define the latitude of center of map.                                           |
| `token` | `string` | `undefined` | Define an valid [access-token](https://account.parsimap.ir/token-registration). |

#### Map Optional Arguments

| title         | type                                 | default                | description                                         |
|---------------|--------------------------------------|------------------------|-----------------------------------------------------|
| `mapStyle`    | `ParsimapMapStyle`                   | `parsimap-streets-v11` | The style of the map.                               |
| `onLoad`      | `(map: event: mapboxgl.MapboxEvent)` | `undefined`            | Detect the map element is defined and fully loaded. |
| `onStyleLoad` | `(map: event: mapboxgl.MapboxEvent)` | `undefined`            | Trigger when style only loaded.                     |

### Marker

The marker can add a _map-marker_ into the **map-view**.

#### Marker Arguments

| title    | type                                                                 | default     | description                                                                                 |
|----------|----------------------------------------------------------------------|-------------|---------------------------------------------------------------------------------------------|
| `lngLat` | [LngLat](https://docs.mapbox.com/mapbox-gl-js/api/geography/#lnglat) | `undefined` | The longitude and latitude of a point such as, [number, number] or {lng:number, lat:number} |

### GeoJSONSource

This component provided an interface for adding geoJSON format file to the map.

#### GeoJSONSource Arguments

| title  | type                                             | default     | description                                             |
|--------|--------------------------------------------------|-------------|---------------------------------------------------------|
| `id`   | `string`                                         | `undefined` | an unique id determine for identify the source by that. |
| `data` | [GeoJSON](https://en.wikipedia.org/wiki/GeoJSON) | `undefined` | a GeoJSON format data                                   |

### Layer

This component allows adding a feature on the map to describe the feature type
and which type of data that was added by resource could be used, for instance to
illustrate a point feature the `symbol` or `circle` could be suitable.
To see more about layers, you can read [mapbox-gl-js layers](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/).

#### Layer Arguments

| title    | type                                                                       | default     | description                                                    |
|----------|----------------------------------------------------------------------------|-------------|----------------------------------------------------------------|
| `id`     | `string`                                                                   | `undefined` | An unique id to determine for identify the layer               |
| `type`   | [Layer Type](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#type) | `undefined` | The type for a layer which is specifying the shape of feature. |
| `source` | `string`                                                                   | `undefined` | The source should be an existed source                         |

#### Layer Optional Arguments

| title    | type     | default     | description                                 |
|----------|----------|-------------|---------------------------------------------|
| `layout` | `string` | `undefined` | Can determines the layout config of a layer |
| `paint`  | `string` | `undefined` | Can determines the paint config of a layer  |
| `filter` | `string` | `undefined` | Can determines the filter for a layer       |

## Usage

Samples for use the map are placed at here.

### Render Map with features

There is a line layer which is created by `streets` source and a circle for each
coordinate of that and a marker which is added to the map in the
defined `lngLat`.

```tsx
import {
  GeoJSONSource,
  Layer,
  Map,
  Marker,
  ViewPort,
} from "@parsimap/react-mapbox-gl";
import mapboxgl from "mapbox-gl";
import {AtRule} from "csstype";
import Viewport = AtRule.Viewport;

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
          [51.414, 35.7571],
        ],
      },
      properties: {},
    },
  ],
};

/**
 * A view port can change current view and zoom of the map.
 */
const DEFAULT_VIEW_PORT: ViewPort = {
  zoom: 16,
  lng: 51.41,
  lat: 35.7575,
};

const Sample = () => {
  function handleClick(event: mapboxgl.MapMouseEvent) {
    console.log("current lng:", event.lngLat.lng);
    console.log("current lat:", event.lngLat.lat);
  }

  function handleViewPortChange(viewPort: Viewport) {
    // Doing somethign with updated viewPort
  }

  return (
    <Map
      onClick={handleClick}
      token={"{PMI_TOKEN}"}
      style={"parsimap-streets-v11"}
      onViewPortChange={handleViewPortChange}
      {...DEFAULT_VIEW_PORT}
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

### Using a created map object

There is a sample to access the map instance which was created,
with using this the ability to interact with a map can be performed.
For more interacted with a map, you can follow the method section
of [mapbox-gl-js docs](https://docs.mapbox.com/mapbox-gl-js/api/map/#instance-members-map-constraints).
In this example, the 'setCenter' method is changing the current center of the map to new value, to access the map
instance there is a need to use `load` event on the other hand `onLoad` prop of the `Map` component.

```tsx
import {Map, ViewPort} from "@parsimap/react-mapbox-gl";
import mapboxgl from "mapbox-gl";

/**
 * A view port can change current view and zoom of the map.
 */
const DEFAULT_VIEW_PORT: ViewPort = {
  zoom: 16,
  lng: 51.41,
  lat: 35.7575,
};

const Sample = () => {
  function handleLoad(event: mapboxgl.MapboxEvent) {
    // the map instance can be accessed from here to interact with map.
    const map = event.target;
    const newCenter = new mapboxgl.LngLat(51, 41);
    map.setCenter(newCenter);
  }

  return (
    <Map onLoad={handleLoad} token={"{PMI_TOKEN}"} {...DEFAULT_VIEW_PORT} />
  );
};

export default Sample;
```

## License

MIT © [Parsimap](https://github.com/parsimap)
