import type { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";

import { useRTCClient } from "../hooks/useRTCClient";
import { listen } from "../misc/listen";
import { joinDisposers, timeout } from "../misc/utils";

export function useIsConnected(client?: IAgoraRTCClient | null): boolean {
  const resolvedClient = useRTCClient(client);

  const [isConnected, setConnected] = useState(
    resolvedClient ? resolvedClient.connectionState === "CONNECTED" : false,
  );
  useEffect(() => {
    if (resolvedClient) {
      setConnected(resolvedClient.connectionState === "CONNECTED");
      let dispose: (() => void) | undefined;
      return joinDisposers([
        listen(resolvedClient, "connection-state-change", state => {
          dispose?.();
          // RTC is really connected after a short delay
          dispose = timeout(() => setConnected(state === "CONNECTED"), 0);
        }),
        () => dispose?.(),
      ]);
    } else {
      setConnected(false);
    }
  }, [resolvedClient]);

  return isConnected;
}
