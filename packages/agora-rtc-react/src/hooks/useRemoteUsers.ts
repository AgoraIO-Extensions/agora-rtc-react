import type { IAgoraRTCClient, IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";

import { useRTCClient } from "../hooks/useRTCClient";
import { listen } from "../misc/listen";
import { joinDisposers } from "../misc/utils";

/**
 * This hook lets you retrieve the list of remote users.
 * The return value of this hook is updated in the following cases:
 * When a remote user joins or leaves the channel.
 * When the role of a remote user changes (for example, from broadcaster to audience).
 * When a remote user publishes or unpublishes the audio or video track.
 *
 * @param client - Created using the Web SDK's [`IAgoraRTC.createClient`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartc.html#createclient) method.
 * @example
 * ```jsx
 * import { useRemoteUsers } from "agora-rtc-react";
 *
 * function App() {
 *   const remoteUsers = useRemoteUsers();
 *
 *   return <></>;
 * }
 * ```
 */
export function useRemoteUsers(client?: IAgoraRTCClient | null): IAgoraRTCRemoteUser[] {
  const resolvedClient = useRTCClient(client);
  const [users, setUsers] = useState(resolvedClient ? resolvedClient.remoteUsers : []);

  useEffect(() => {
    if (resolvedClient) {
      // .slice(): make sure the array reference is updated
      const update = () => setUsers(resolvedClient.remoteUsers.slice());
      return joinDisposers([
        listen(resolvedClient, "user-joined", update),
        listen(resolvedClient, "user-left", update),
        listen(resolvedClient, "user-published", update),
        listen(resolvedClient, "user-unpublished", update),
      ]);
    }
  }, [resolvedClient]);

  return users;
}
