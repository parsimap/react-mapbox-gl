# react-mapboxgl

> A Library to render mapboxgl mapview with power of parsimap services.

[![NPM](https://img.shields.io/npm/v/@parsimap/react-mapbox-gl.svg)](https://www.npmjs.com/package/@parsimap/react-mapbox-gl) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-mapboxgl
```

## Usage

```tsx
import React, { useState } from "react";
import { IViewPort, MapView, Layer, Source } from "@parsimap/react-mapbox-gl";

const App = () => {
  const [viewPort, setViewPort] = useState<IViewPort>({
    zoom: 12,
    lng: 51.41,
    lat: 35.7575,
  });

  return (
    <MapView
      {...viewPort}
      token={"ac3fed7ee26d424e9781400f4106dd38"}
      onViewPortChange={setViewPort}
    >
      <Source id={""} />
      <Layer type={"symbol"} />
    </MapView>
  );
};

export default App;
```

## License

MIT © [Parsimap](https://github.com/parsimap)
