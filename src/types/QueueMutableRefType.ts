import React from "react";
import { QueueCallbackType } from "./QueueCallbackType";

export type QueueMutableRefType = React.MutableRefObject<
  Record<string, QueueCallbackType>
>;
