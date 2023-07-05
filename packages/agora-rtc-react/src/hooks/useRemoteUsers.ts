import type { IAgoraRTCClient, IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";

import { useRTCClient } from "../hooks/useRTCClient";
import { listen } from "../misc/listen";
import { joinDisposers } from "../misc/utils";

/**
 * Occurs when a remote user becomes online or offline. (client `user-join`, `user-left`, `user-published` and `user-unpublished` events)
 *
 * Updated when one of the following situations occurs:
 * - In a communication channel:
 *   - A remote user joins or leaves the channel.
 *   - A remote user published or unpublished the channel.
 *   - A remote user has dropped offline or rejoins the channel after a network interruption.
 * - In a live-broadcast channel:
 *   - A remote host joins or leaves the channel.
 *   - A remote host published or unpublished the channel.
 *   - A remote host has dropped offline or rejoins the channel after a network interruption.
 *   - A remote host/user switches the client role between host and audience.
 *
 * ```jsx
 * const remoteUsers = useRemoteUsers(client)
 * const publishedUsers = remoteUsers.filter(user => user.hasAudio || user.hasVideo);
 * return remoteUsers.map(user => (
 *   <li key={user.uid}>{getUserName(user.uid)}</li>
 * ))
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
