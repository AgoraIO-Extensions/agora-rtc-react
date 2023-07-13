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
 * Returns the IAgoraRTCClient object.
 *
 * @param `client` {IAgoraRTCClient | null} If provided, the passed `IAgoraRTCClient` object is returned. If not provided, the `IAgoraRTCClient` object obtained from the [parent component's context](./components#agorartcprovider) is returned.
 * @return IAgoraRTCClient The IAgoraRTCClient client.
 * @example
 * ```jsx
 * import { useRTCClient } from "agora-rtc-react";
 *
 * function App() {
 *   const client = useRTCClient();
 *
 *   return <></>;
 * }
 * ```
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
