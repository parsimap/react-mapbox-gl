import { QueueCallbackType } from "../types/QueueCallbackType";

export default interface ISourceQueueTask {
  id: string;
  callback: QueueCallbackType;
}
