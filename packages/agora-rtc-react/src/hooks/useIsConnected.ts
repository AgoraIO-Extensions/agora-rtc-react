import type { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";

import { useRTCClient } from "../hooks/useRTCClient";
import { listen } from "../misc/listen";
import { joinDisposers, timeout } from "../misc/utils";

/**
 * 用于获取客户端是否连接到服务器。
 *
 * @param `client` {IAgoraRTCClient | null} `IAgoraRTCClient` 对象。
 * @return boolean <li>true：客户端已连接到服务器。</li><li>false：客户端没有连接到服务器。</li>
 * @example
 * ```jsx
 * import { useIsConnected } from "agora-rtc-react";
 *
 * function App() {
 *   const isConnected = useIsConnected();
 *
 *   return <div>{isConnected}</div>;
 * }
 * ```
 */
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
