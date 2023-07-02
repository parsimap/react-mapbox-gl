import { QueueCallbackType } from "../types/QueueCallbackType";
import ISourceQueueTask from "./ISourceQueueTask";
import ILayerQueueTask from "./ILayerQueueTask";

export default interface IQueue {
  images: QueueCallbackType;
  layers: Record<string, ILayerQueueTask>;
  sources: Record<string, ISourceQueueTask>;
  markers: Record<string, QueueCallbackType>;
}
