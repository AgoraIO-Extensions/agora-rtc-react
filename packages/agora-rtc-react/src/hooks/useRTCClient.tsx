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
 * Get a Agora RTC client from context. Throws error if client not found.
 * @param client If a client is provided, it will be used instead.
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
