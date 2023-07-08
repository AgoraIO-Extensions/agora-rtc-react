import type { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";

import { useRTCClient } from "../hooks/useRTCClient";
import { listen } from "../misc/listen";
import type { NetworkQuality } from "../types";

const initQuality = (): NetworkQuality => ({
  uplink: 0,
  downlink: 0,
  delay: 0,
});

/**
 * 用于获取本地用户网络质量。
 *
 * @param `client` {IAgoraRTCClient | null} 通过 Web SDK 的 [IAgoraRTC.createClient](https://docportal.shengwang.cn/cn/video-call-4.x/API%20Reference/web_ng/interfaces/iagorartc.html#createclient) 创建。
 * @return NetworkQuality 本地用户的网络质量信息。详见 NetworkQuality。
 */
export function useNetworkQuality(client?: IAgoraRTCClient | null): NetworkQuality {
  const resolvedClient = useRTCClient(client);

  const [networkQuality, setNetworkQuality] = useState<NetworkQuality>(initQuality);
  useEffect(() => {
    if (resolvedClient) {
      return listen(resolvedClient, "network-quality", q =>
        setNetworkQuality({
          uplink: q.uplinkNetworkQuality,
          downlink: q.downlinkNetworkQuality,
          delay: resolvedClient.getRTCStats().RTT ?? 0,
        }),
      );
    } else {
      setNetworkQuality(initQuality());
    }
  }, [resolvedClient]);

  return networkQuality;
}
