import mapboxgl from "mapbox-gl";

export default function preloadMapboxPlugins(cdnUrl = "https://cdn.parsimap.ir") {
  if (mapboxgl.getRTLTextPluginStatus() === "unavailable") {
    mapboxgl.setRTLTextPlugin(
      `${cdnUrl}/third-party/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js`,
      () => {}
    );
  }
}
