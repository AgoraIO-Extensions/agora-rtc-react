import type { IAgoraRTCClient, UID } from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";

import { useRTCClient } from "../hooks/useRTCClient";
import { listen } from "../misc/listen";
import { timeout } from "../misc/utils";

/**
 * @returns The UID of the local user if connected to a channel, `undefined` otherwise.
 */
export function useCurrentUID(client?: IAgoraRTCClient | null): UID | undefined {
  const resolvedClient = useRTCClient(client);

  const [uid, setUID] = useState<UID | undefined>(resolvedClient?.uid);
  useEffect(() => {
    if (resolvedClient) {
      return listen(resolvedClient, "connection-state-change", state => {
        if (state === "CONNECTED") {
          // RTC is really connected after a short delay
          return timeout(() => setUID(resolvedClient.uid), 0);
        } else if (state === "DISCONNECTED") {
          setUID(void 0);
        }
      });
    }
  }, [resolvedClient]);

  return uid;
}
