import type { ConnectionState, IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";

import { useRTCClient } from "../hooks/useRTCClient";
import { listen } from "../misc/listen";
import { joinDisposers, timeout } from "../misc/utils";

/**
 * Returns the detailed connection state of the SDK.
 *
 * @param client - Created using the Web SDK's [`IAgoraRTC.createClient`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartc.html#createclient) method.
 * @example
 * ```jsx
 * import { useConnectionState } from "agora-rtc-react";
 *
 * function App() {
 *   const connectionState = useConnectionState();
 *
 *   return <div>{connectionState}</div>;
 * }
 * ```
 */
export function useConnectionState(client?: IAgoraRTCClient | null): ConnectionState {
  const resolvedClient = useRTCClient(client);

  const [connectionState, setConnectionState] = useState(
    resolvedClient ? resolvedClient.connectionState : "DISCONNECTED",
  );
  useEffect(() => {
    if (resolvedClient) {
      setConnectionState(resolvedClient.connectionState);
      let dispose: (() => void) | undefined;
      return joinDisposers([
        listen(resolvedClient, "connection-state-change", state => {
          dispose?.();
          if (state === "CONNECTED") {
            // RTC is really connected after a short delay
            dispose = timeout(() => setConnectionState(state), 0);
          } else {
            setConnectionState(state);
          }
        }),
        () => dispose?.(),
      ]);
    } else {
      setConnectionState("DISCONNECTED");
    }
  }, [resolvedClient]);

  return connectionState;
}
