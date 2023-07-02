import { QueueCallbackType } from "../types/QueueCallbackType";

export default interface ILayerQueueTask {
  sourceId: string;
  callback: QueueCallbackType;
}
