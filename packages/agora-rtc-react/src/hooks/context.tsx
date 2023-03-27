import type { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import type { ReactNode } from "react";

import { createContext, useContext } from "react";
export { TrackBoundary } from "../components/TrackBoundary";

const AgoraRTCContext = /* @__PURE__ */ createContext<IAgoraRTCClient | null>(null);

export interface AgoraRTCProviderProps {
  readonly client: IAgoraRTCClient;
  readonly children?: ReactNode;
}

export function AgoraRTCProvider({ client, children }: AgoraRTCProviderProps) {
  return <AgoraRTCContext.Provider value={client}>{children}</AgoraRTCContext.Provider>;
}

/**
 * Get a Agora RTC client from context.
 * @param client If a client is provided, it will be used instead.
 */
export function useOptionalRTCClient(client?: IAgoraRTCClient | null): IAgoraRTCClient | null {
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
