import { MapStyleType } from "../../types/MapStyleType";
import getStyleURL from "./getStyleURL";

export default function normalizeMapStyle(
  mapStyle: MapStyleType | undefined,
  token:string,
  baseApiUrl?: string
) {
  if (!mapStyle) {
    return getStyleURL("parsimap-streets-v11", token, baseApiUrl);
  }

  if (typeof mapStyle === "object") {
    return mapStyle;
  }

  return getStyleURL(mapStyle, token, baseApiUrl)
}
