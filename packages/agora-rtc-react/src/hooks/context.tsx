import type { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";

const AgoraRTCContext = /* @__PURE__ */ createContext<IAgoraRTCClient | null>(null);

export interface AgoraRTCProviderProps {
  client: IAgoraRTCClient;
}

export function AgoraRTCProvider({ client, children }: PropsWithChildren<AgoraRTCProviderProps>) {
  return <AgoraRTCContext.Provider value={client}>{children}</AgoraRTCContext.Provider>;
}

export function useRTCClient() {
  const client = useContext(AgoraRTCContext);
  if (!client) {
    throw new Error("should be wrapped in <AgoraRTCProvider value={client} />");
  }
  return client;
}
