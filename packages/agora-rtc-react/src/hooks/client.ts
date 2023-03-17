import type { IAgoraRTCClient, NetworkQuality } from "agora-rtc-sdk-ng";

import { useState } from "react";
import { useClientEvent } from "./events";

export function useConnectionState(client?: IAgoraRTCClient | null) {
  const [connectionState, setConnectionState] = useState(
    client ? client.connectionState : "DISCONNECTED",
  );
  useClientEvent(client, "connection-state-change", setConnectionState);
  return connectionState;
}

export function useNetworkQuality(client?: IAgoraRTCClient | null) {
  const [networkQuality, setNetworkQuality] = useState<NetworkQuality>({
    uplinkNetworkQuality: 0,
    downlinkNetworkQuality: 0,
  });
  useClientEvent(client, "network-quality", setNetworkQuality);
  return networkQuality;
}
