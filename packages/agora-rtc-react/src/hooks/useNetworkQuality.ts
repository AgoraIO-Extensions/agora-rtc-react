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
