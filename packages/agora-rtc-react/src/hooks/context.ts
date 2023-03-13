import type { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { createContext, useContext } from "react";

const AgoraRTCContext = createContext<IAgoraRTCClient | null>(null);

export const AgoraRTCProvider = AgoraRTCContext.Provider;

export function useRTCClient() {
  const client = useContext(AgoraRTCContext);
  if (!client) {
    throw new Error("should be wrapped in <AgoraRTCProvider value={client} />");
  }
  return client;
}
