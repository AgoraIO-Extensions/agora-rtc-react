import type { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";

import { useRTCClient } from "../hooks/useRTCClient";
import { listen } from "../misc/listen";
import type { NetworkQualityEx } from "../types";

const initQuality = (): NetworkQualityEx => ({
  uplinkNetworkQuality: 0,
  downlinkNetworkQuality: 0,
  delay: 0,
});

/**
 * Returns the network quality of the local user.
 *
 * @param client - Created using the Web SDK's [`IAgoraRTC.createClient`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartc.html#createclient) method.
 * @example
 * ```jsx
 * import { useNetworkQuality } from "agora-rtc-react";
 *
 * function App() {
 *   const networkQuality = useNetworkQuality();
 *
 *   return <div>{networkQuality}</div>;
 * }
 * ```
 */
export function useNetworkQuality(client?: IAgoraRTCClient | null): NetworkQualityEx {
  const resolvedClient = useRTCClient(client);

  const [networkQuality, setNetworkQuality] = useState<NetworkQualityEx>(initQuality);
  useEffect(() => {
    if (resolvedClient) {
      return listen(resolvedClient, "network-quality", q =>
        setNetworkQuality({
          uplinkNetworkQuality: q.uplinkNetworkQuality,
          downlinkNetworkQuality: q.downlinkNetworkQuality,
          delay: resolvedClient.getRTCStats().RTT ?? 0,
        }),
      );
    } else {
      setNetworkQuality(initQuality());
    }
  }, [resolvedClient]);

  return networkQuality;
}
