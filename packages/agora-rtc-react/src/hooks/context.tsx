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
 * Get a Agora RTC client from context
 */
export function useRTCClient(optional?: false): IAgoraRTCClient;
/**
 * Get a Agora RTC client from context
 * @param optional do not throw error if client is not found
 */
export function useRTCClient(optional: true): IAgoraRTCClient | null;
export function useRTCClient(optional?: boolean) {
  const client = useContext(AgoraRTCContext);
  if (!client) {
    if (!optional) {
      throw new Error("should be wrapped in <AgoraRTCProvider value={client} />");
    }
  }
  return client;
}
