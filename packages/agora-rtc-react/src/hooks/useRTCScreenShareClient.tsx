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

/**
 * Get a screen share client from context.
 * @param client If a client is provided, it will be used instead.
 */
export function useRTCScreenShareClient(client?: IAgoraRTCClient | null): IAgoraRTCClient | null {
  const clientFromContext = useContext(AgoraRTCScreenShareContext);
  return client || clientFromContext;
}
