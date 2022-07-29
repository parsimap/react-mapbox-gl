import React, { useState } from "react";

import { IViewPort, MapView, Layer,  } from "react-mapboxgl";

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
      <Layer type={"symbol"} />
    </MapView>
  );
};

export default App;
