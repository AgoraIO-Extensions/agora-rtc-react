import type { IAgoraRTCClient, IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";

import { listen } from "../listen";
import { joinDisposers } from "../utils";

import { useRTCClient } from "./context";

/**
 * Occurs when a remote user becomes online or offline. (client `user-join` and `user-left` events)
 *
 * Updated when one of the following situations occurs:
 * - In a communication channel:
 *   - A remote user joins or leaves the channel.
 *   - A remote user has dropped offline or rejoins the channel after a network interruption.
 * - In a live-broadcast channel:
 *   - A remote host joins or leaves the channel.
 *   - A remote host has dropped offline or rejoins the channel after a network interruption.
 *   - A remote host/user switches the client role between host and audience.
 *
 * ```jsx
 * const remoteUsers = useRemoteUsers(client)
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
      ]);
    }
  }, [resolvedClient]);

  return users;
}

/**
 * Updated when a remote user publishes or unpublishes an audio or video track. (client `user-published` and `user-unpublished` events)
 *
 * ```jsx
 * const publishedUsers = usePublishedUsers(client)
 * return publishedUsers.map(user => (
 *   <RemoteUser key={user.uid} user={user} />
 * ))
 * ```
 */
export function usePublishedRemoteUsers(client?: IAgoraRTCClient | null): IAgoraRTCRemoteUser[] {
  const resolvedClient = useRTCClient(client);

  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>(() =>
    resolvedClient.remoteUsers.filter(
      user => user.uid !== resolvedClient.uid && (user.hasAudio || user.hasVideo),
    ),
  );

  useEffect(() => {
    if (resolvedClient) {
      const updatePublishedRemoteUsers = () => {
        setUsers(users => {
          const newUsers: IAgoraRTCRemoteUser[] = [];
          let isSame = true;

          for (let i = 0; i < resolvedClient.remoteUsers.length; i++) {
            const user = resolvedClient.remoteUsers[i];
            if (user.uid !== resolvedClient.uid && (user.hasAudio || user.hasVideo)) {
              newUsers.push(user);
              if (isSame) {
                isSame = i < users.length && users[i] === user;
              }
            }
          }

          isSame = isSame && newUsers.length === users.length;

          return isSame ? users : newUsers;
        });
      };

      updatePublishedRemoteUsers();

      return joinDisposers([
        listen(resolvedClient, "user-joined", updatePublishedRemoteUsers),
        listen(resolvedClient, "user-left", updatePublishedRemoteUsers),
        listen(resolvedClient, "user-published", updatePublishedRemoteUsers),
        listen(resolvedClient, "user-unpublished", updatePublishedRemoteUsers),
      ]);
    }
  }, [resolvedClient]);

  return users;
}
