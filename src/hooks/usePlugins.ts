import React from "react";
import preloadMapboxPlugins from "../lib/utilites/preloadMapboxPlugins";

const usePlugins = (cdnUrl?: string) => {
  React.useEffect(() => {
    preloadMapboxPlugins(cdnUrl);
  }, [cdnUrl]);
};

export default usePlugins;
