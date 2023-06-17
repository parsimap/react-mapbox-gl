
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
    - [Map Optional Arguments](#map-optional-arguments)
  - [Marker](#marker)
    - [Marker Arguments](#marker-arguments)
    - [Marker Optional Arguments](#marker-optional-arguments)
  - [Layer](#layer)
    - [Layer Arguments](#layer-arguments)
    - [Layer Optional Arguments](#layer-optional-arguments)
  - [SymbolLayer](#symbollayer)
    - [SymbolLayer Arguments](#symbollayer-arguments)
    - [SymbolLayer Optional Arguments](#symbollayer-optional-arguments)
  - [HeatmapLayer](#heatmaplayer)
    - [SymbolLayer Arguments](#heatmaplayer-arguments)
    - [SymbolLayer Optional Arguments](#heatmaplayer-optional-arguments)
  - [LineLayer](#linelayer)
    - [LineLayer Arguments](#linelayer-arguments)
    - [LineLayer Optional Arguments](#linelayer-optional-arguments)
  - [FillLayer](#filllayer)
    - [FillLayer Arguments](#filllayer-arguments)
    - [FillLayer Optional Arguments](#filllayer-optional-arguments)
  - [CircleLayer](#circlelayer)
    - [CircleLayer Arguments](#circlelayer)
    - [CircleLayer Optional Arguments](#circlelayer-optional-arguments)
- [Type Definition](#type-definitions)
  - [Style](#style)
  - [LngLat](#lnglat)
  - [ViewPort](#viewport)
- [Usage](#usage)
  - [Render Map with features](#render-map-with-features)
  - [Render Map with features](#using-a-created-map-instance)

## Changelog

**version** `1.3.5`

- The problem with layer change by source is currently resolved.

**version** `1.3.2`

- [SymbolLayer](#symbollayer-optional-arguments) and [HeatmapLayer](#heatmaplayer) were added.
- The `cluster` were added to [GeoJSONSource](#geojsonsource) as an optional argument.
- The `color` which added to [Marker](#marker) as an argument is seperated to optional arguments.
- The `[number, number]` type of lngLat for [Marker](#marker) was added and there is no need to enforce type
  as `mapboxgl.LngLatLike`.
- The `bounds` argument of the [Map](#map) component is accepted not `mapboxgl.LngLatBounds`
  or `mapboxgl.LngLatBoundsLike` as input which means the input can also `[number, number, number, number]` and there is
  no need to define
  type of input as standard type.
- `bounds` and `maxBounds` were added to the [Map Optional Arguments](#map-optional-arguments) section.
- Some problems were found while update source which is started work on it and fixed in upcoming versions.

**version** `1.2.9`

- The problem with adding multiple [Marker](#marker) was resolved.
- The `color` property was added to [Marker](#marker) which able marker to has a specific color rather than `ocean blue`
  color.

**version** `1.2.8`

- [LineLayer](#linelayer), [FillLayer](#filllayer), and [CircleLayer](#circlelayer) are provided a new way of define
  layer for each type.
- Some problem was fixed.

**version** `1.2.6`

- [Layer](#layer) can be changed by passed props such as `layout`, `paint` or `filter` in anytime.
- [Source](#geojsonsource) and [Layer](#layer) is recreated after [Style](#style) is reloaded
- [Style](#style) is added to the [type definitions](#type-definitions) section of the documentation.

**version** `1.2.4`

- An incorrect `onClick` for the [Layer](#layer) component type definition was fixed.
- The problem with defined layer twice in some scenario was resolved.

**version** `1.2.2`

* `OnViewPortChange` was added to [Map](#map) officially, and you can get the latest center and zoom without a need to
  use `OnMoveEnd` to retrieve data.
* Some improvements in performance were applied.
* [Type Definition](#type-definitions) and added to documentation.

**version** `1.2.1-beta.2`

* The events to determine to load the map and its style were implemented and worked in tree branches of components which
  control by convenient state management.
* The main code was reviewed.

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
| `token` | `string` | `undefined` | Define an valid [access token](https://account.parsimap.ir/token-registration). |

#### Map Optional Arguments

| title              | type                                                                                                                   | default                | description                                                                                                                            |
|--------------------|------------------------------------------------------------------------------------------------------------------------|------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `mapStyle`         | [Style](#style)                                                                                                        | `parsimap-streets-v11` | The style of the map.                                                                                                                  |
| `onLoad`           | `(map: event: mapboxgl.MapboxEvent) => void`                                                                           | `undefined`            | Detect the map element is defined and fully loaded.                                                                                    |
| `onStyleLoad`      | `(map: event: mapboxgl.MapboxEvent) => void`                                                                           | `undefined`            | Trigger when style only loaded.                                                                                                        |
| `onViewPortChange` | (viewPort: [ViewPort](#viewport)) => void                                                                              | `undefined`            | Trigger when style only loaded.                                                                                                        |
| `zoom`             | `number`                                                                                                               | `undefined`            | Change zoom level of the map.                                                                                                          |
| `bounds`           | `[number, number, number, number]`\|  [LngLatBounds](https://docs.mapbox.com/mapbox-gl-js/api/geography/#lnglatbounds) | `undefined`            | Determine the current bounds of the map.                                                                                               |
| `maxBounds`        | `[number, number, number, number]`\|  [LngLatBounds](https://docs.mapbox.com/mapbox-gl-js/api/geography/#lnglatbounds) | `undefined`            | Determine the maximum bounds of the map which is can provided moving the map by a boundary for example a country or specific province. |

### Marker

The marker can add a _map-marker_ into the **map-view**.

#### Marker Arguments

| title    | type                                                                                     | default     | description                                                                                 |
|----------|------------------------------------------------------------------------------------------|-------------|---------------------------------------------------------------------------------------------|
| `lngLat` | [number, number] \| [LngLat](https://docs.mapbox.com/mapbox-gl-js/api/geography/#lnglat) | `undefined` | The longitude and latitude of a point such as, [number, number] or {lng:number, lat:number} |

#### Marker Optional Arguments

| title   | type     | default      | description                                  |
|---------|----------|--------------|----------------------------------------------|
| `color` | `string` | `ocean blue` | A color which determines the fill of marker. |

### GeoJSONSource

This component provided an interface for adding geoJSON format file to the map.

#### GeoJSONSource Arguments

| title     | type                                             | default     | description                                                      |
|-----------|--------------------------------------------------|-------------|------------------------------------------------------------------|
| `id`      | `string`                                         | `undefined` | An unique id determine for identify the source by that.          |
| `data`    | [GeoJSON](https://en.wikipedia.org/wiki/GeoJSON) | `undefined` | A GeoJSON format data                                            |
| `cluster` | `boolean`                                        | `undefined` | This property could convert the source to a cluster-able source. |

### Layer

This component allows adding a feature on the map to describe the feature type
and which type of data that was added by resource could be used, for instance to
illustrate a point feature the `symbol` or `circle` could be suitable.
To see more about layers, you can read [mapbox-gl-js layers](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/).

#### Layer Arguments

| title    | type                                                                      | default     | description                                                    |
|----------|---------------------------------------------------------------------------|-------------|----------------------------------------------------------------|
| `id`     | `string`                                                                  | `undefined` | An unique id to determine for identify the layer               |
| `type`   | [LayerType](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#type) | `undefined` | The type for a layer which is specifying the shape of feature. |
| `source` | `string`                                                                  | `undefined` | The source should be existed                                   |

#### Layer Optional Arguments

| title    | type     | default     | description                                 |
|----------|----------|-------------|---------------------------------------------|
| `layout` | `object` | `undefined` | Can determines the layout config of a layer |
| `paint`  | `object` | `undefined` | Can determines the paint config of a layer  |
| `filter` | `object` | `undefined` | Can determines the filter for a layer       |

### LineLayer

This component allows
adding a [line layer](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#line) to the map
which data should be type of `LineString` in `GeoJSONSource`.

#### LineLayer Arguments

| title    | type     | default     | description                                      |
|----------|----------|-------------|--------------------------------------------------|
| `id`     | `string` | `undefined` | An unique id to determine for identify the layer |
| `source` | `string` | `undefined` | The source should be existed                     |

#### LineLayer Optional Arguments

| title    | type                          | default     | description                                 |
|----------|-------------------------------|-------------|---------------------------------------------|
| `layout` | [LineLayerLayout](#linelayer) | `undefined` | Can determines the layout config of a layer |
| `paint`  | `object`                      | `undefined` | Can determines the paint config of a layer  |
| `filter` | `object`                      | `undefined` | Can determines the filter for a layer       |

### FillLayer

This component allows
adding a [fill layer](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#fill) to the map
which data should be type of `Polygon` in `GeoJSONSource`.

#### FillLayer Arguments

| title    | type     | default     | description                                      |
|----------|----------|-------------|--------------------------------------------------|
| `id`     | `string` | `undefined` | An unique id to determine for identify the layer |
| `source` | `string` | `undefined` | The source should be existed                     |

#### FillLayer Optional Arguments

| title    | type     | default     | description                                 |
|----------|----------|-------------|---------------------------------------------|
| `layout` | `object` | `undefined` | Can determines the layout config of a layer |
| `paint`  | `object` | `undefined` | Can determines the paint config of a layer  |
| `filter` | `object` | `undefined` | Can determines the filter for a layer       |

### CircleLayer

This component allows
adding a [circle layer](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#circle) to the map
which data should be type of `Point` in `GeoJSONSource`.

#### CircleLayer Arguments

| title    | type     | default     | description                                      |
|----------|----------|-------------|--------------------------------------------------|
| `id`     | `string` | `undefined` | An unique id to determine for identify the layer |
| `source` | `string` | `undefined` | The source should be existed                     |

#### CircleLayer Optional Arguments

| title    | type     | default     | description                                 |
|----------|----------|-------------|---------------------------------------------|
| `layout` | `object` | `undefined` | Can determines the layout config of a layer |
| `paint`  | `object` | `undefined` | Can determines the paint config of a layer  |
| `filter` | `object` | `undefined` | Can determines the filter for a layer       |

### SymbolLayer

This component allows
adding a [circle layer](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#symbol) to the map
which data should be type of `Point` in `GeoJSONSource`.

#### SymbolLayer Arguments

| title    | type     | default     | description                                      |
|----------|----------|-------------|--------------------------------------------------|
| `id`     | `string` | `undefined` | An unique id to determine for identify the layer |
| `source` | `string` | `undefined` | The source should be existed                     |

#### SymbolLayer Optional Arguments

| title    | type     | default     | description                                 |
|----------|----------|-------------|---------------------------------------------|
| `layout` | `object` | `undefined` | Can determines the layout config of a layer |
| `paint`  | `object` | `undefined` | Can determines the paint config of a layer  |
| `filter` | `object` | `undefined` | Can determines the filter for a layer       |

### HeatmapLayer

This component allows
adding a [circle layer](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#heatmap) to the map
which data should be type of `Point` in `GeoJSONSource`.

#### HeatmapLayer Arguments

| title    | type     | default     | description                                      |
|----------|----------|-------------|--------------------------------------------------|
| `id`     | `string` | `undefined` | An unique id to determine for identify the layer |
| `source` | `string` | `undefined` | The source should be existed                     |

#### HeatmapLayer Optional Arguments

| title    | type     | default     | description                                 |
|----------|----------|-------------|---------------------------------------------|
| `layout` | `object` | `undefined` | Can determines the layout config of a layer |
| `paint`  | `object` | `undefined` | Can determines the paint config of a layer  |
| `filter` | `object` | `undefined` | Can determines the filter for a layer       |

## Type Definitions

### Style

| Name                   | Description                               |
|------------------------|-------------------------------------------|
| `parsimap-streets-v11` | A simple open-streets map style friendly. |
| `satellite-raster`     | A Raster tile as a satellite images       |
| `map-raster`           | A Raster tile as a map images             |

### LngLat

| title | type     | description                                               |
|-------|----------|-----------------------------------------------------------|
| `lng` | `number` | The longitude, usually is determined by a decimal number. |
| `lat` | `number` | The latitude, usually is determined by a decimal number.  |

### ViewPort

| title    | type              | description                                |
|----------|-------------------|--------------------------------------------|
| `zoom`   | `number`          | The zoom level.                            |
| `lngLat` | [LngLat](#lnglat) | Can determines the paint config of a layer |

### Line Layer Layout

To get more details, follow the [line layer](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#line) part of the
mapbox documentation.
At here, only some most common attributes are included.

| title          | type                                                                                           | default   | description                                     |
|----------------|------------------------------------------------------------------------------------------------|-----------|-------------------------------------------------|
| `line-color`   | [LineColor](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#paint-line-line-color)     | `#000000` | Determines the color of the line.               |
| `line-width`   | [LineWidth](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#paint-line-line-width)     | `1`       | Defines the width of line.                      |
| `line-opacity` | [LineOpacity](https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#paint-line-line-opacity) | `1`       | Defines the opacity of line between `0` to `1`. |

### Line Layer Paint

| title    | type              | description                                |
|----------|-------------------|--------------------------------------------|
| `zoom`   | `number`          | The zoom level.                            |
| `lngLat` | [LngLat](#lnglat) | Can determines the paint config of a layer |

### LineLayout

| title    | type              | description                                |
|----------|-------------------|--------------------------------------------|
| `zoom`   | `number`          | The zoom level.                            |
| `lngLat` | [LngLat](#lnglat) | Can determines the paint config of a layer |

## Usage

Samples for use the map are placed at here.

### Render Map with features

There is a line layer which is created by `streets` source and a circle for each
coordinate of that and a marker which is added to the map in the
defined `lngLat`.

```tsx
import {CircleLayer, GeoJSONSource, LineLayer, Map, Marker, ViewPort} from "@parsimap/react-mapbox-gl";
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
    // Doing something with updated viewPort
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
      <LineLayer type={"line"} source={"streets"}/>
      <CircleLayer id={"point"} source={"streets"}/>
      <Marker lngLat={[51.41, 35.7575]}/>
    </Map>
  );
};

export default Sample;
```

### Using a created map instance

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

