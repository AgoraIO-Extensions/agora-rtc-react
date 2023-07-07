import type { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { createContext, useContext } from "react";

import type { AgoraRTCProviderProps } from "./types";

const AgoraRTCContext = /* @__PURE__ */ createContext<IAgoraRTCClient | null>(null);

export function AgoraRTCProvider({ client, children }: AgoraRTCProviderProps) {
  return <AgoraRTCContext.Provider value={client}>{children}</AgoraRTCContext.Provider>;
}
/**
 * @ignore
 */
function useOptionalRTCClient(client?: IAgoraRTCClient | null): IAgoraRTCClient | null {
  const clientFromContext = useContext(AgoraRTCContext);
  return client || clientFromContext;
}

/**
 * 用于获取 IAgoraRTCClient 对象。
 *
 * @param `client` {IAgoraRTCClient | null} 如果传入该参数，则使用传入的 `IAgoraRTCClient` 对象；如果不传入该参数，则使用从[父组件的 Context](./components#agorartcprovider)中获取的 `IAgoraRTCClient` 对象。
 * @return IAgoraRTCClient IAgoraRTCClient 对象。
 */
export function useRTCClient(client?: IAgoraRTCClient | null): IAgoraRTCClient {
  const resolvedClient = useOptionalRTCClient(client);

  if (!resolvedClient) {
    throw new Error(
      "Agora RTC client not found. Should be wrapped in <AgoraRTCProvider value={client} />",
    );
  }

  return resolvedClient;
}
