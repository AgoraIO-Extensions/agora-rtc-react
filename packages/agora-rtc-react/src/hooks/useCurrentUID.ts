import type { IAgoraRTCClient, UID } from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";

import { useRTCClient } from "../hooks/useRTCClient";
import { listen } from "../misc/listen";
import { timeout } from "../misc/utils";

/**
 * Returns the current user ID.
 *
 * @param `client` {IAgoraRTCClient | null} Created using the Web SDK's [`IAgoraRTC.createClient`](https://docportal.shengwang.cn/cn/video-call-4.x/API%20Reference/web_ng/interfaces/iagorartc.html#createclient) method.
 * @return UID | undefined The user ID of the current user. If the current user has not joined any channel, undefined is returned.
 * @example
 * ```jsx
 * import { useCurrentUID } from "agora-rtc-react";
 *
 * function App() {
 *   const uid = useCurrentUID();
 *
 *   return <div>{uid}</div>;
 * }
 * ```
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
