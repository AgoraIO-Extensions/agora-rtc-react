import type { IAgoraRTCClient } from "agora-rtc-sdk-ng";

import { useState } from "react";
import { useClientEvent } from "./events";

export function useConnectionState(client?: IAgoraRTCClient | null) {
  const [connectionState, setConnectionState] = useState(
    client ? client.connectionState : "DISCONNECTED",
  );
  useClientEvent(client, "connection-state-change", setConnectionState);
  return connectionState;
}
