import IMapProps from "../interfaces/IMapProps";
import useViewPort from "./useViewPort";
import useEvents from "./useEvents";
import usePlugins from "./usePlugins";
import useQueue from "./useQueue";
import useInitialization from "./useInitialization";
import useBounds from "./useBounds";
import useStyle from "./useStyle";

const useMap = (props: IMapProps) => {
  const { map, container } = useInitialization(props);
  const prevViewPort = useViewPort(props, map);
  const styleIsLoaded = useStyle(props, map);
  const queue = useQueue(map);
  useEvents(props, prevViewPort, map);
  usePlugins(props.cdnUrl);
  useBounds(props, map);

  return { container, map, queue, styleIsLoaded };
};

export default useMap;
