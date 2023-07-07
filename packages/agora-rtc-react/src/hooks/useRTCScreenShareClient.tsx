import type { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";

const AgoraRTCScreenShareContext = /* @__PURE__ */ createContext<IAgoraRTCClient | null>(null);

export interface AgoraRTCScreenShareProviderProps {
  readonly client: IAgoraRTCClient;
  readonly children?: ReactNode;
}

export function AgoraRTCScreenShareProvider({
  client,
  children,
}: AgoraRTCScreenShareProviderProps) {
  return (
    <AgoraRTCScreenShareContext.Provider value={client}>
      {children}
    </AgoraRTCScreenShareContext.Provider>
  );
}

export function useRTCScreenShareClient(client?: IAgoraRTCClient | null): IAgoraRTCClient | null {
  const clientFromContext = useContext(AgoraRTCScreenShareContext);
  return client || clientFromContext;
}
