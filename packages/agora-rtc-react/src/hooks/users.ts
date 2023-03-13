import type { IAgoraRTCClient, IAgoraRTCRemoteUser, UID } from "agora-rtc-sdk-ng";

import { useEffect, useRef, useState } from "react";
import { listen } from "../listen";
import { joinDisposers } from "../utils";

/**
 * Get interactive remote users in react components.
 *
 * Note: does not include self.
 *
 * ```jsx
 * const remoteUsers = useRemoteUsers(client)
 * return remoteUsers.map(user => (
 *   <li key={user.uid}>{getUserName(user.uid)}</li>
 * ))
 * ```
 */
export function useRemoteUsers(client: IAgoraRTCClient): readonly IAgoraRTCRemoteUser[] {
  const [users, setUsers] = useState(client.remoteUsers);

  useEffect(() => {
    // .slice(): make sure the array reference is updated
    const update = () => setUsers(client.remoteUsers.slice());
    return joinDisposers([
      listen(client, "user-joined", update),
      listen(client, "user-left", update),
    ]);
  }, [client]);

  return users;
}

/**
 * Get published remote users, which may have audio or video tracks.
 *
 * Note: does not include self.
 *
 * ```jsx
 * const publishedUsers = usePublishedUsers(client)
 * return publishedUsers.map(user => (
 *   <RemoteUser key={user.uid} user={user} />
 * ))
 * ```
 */
export function usePublishedRemoteUsers(client: IAgoraRTCClient): readonly IAgoraRTCRemoteUser[] {
  const publishedMap = useRef<Record<UID, number>>({}); // 0b01: audio, 0b10: video, 0b11: both, 0: none
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);

  useEffect(
    () =>
      joinDisposers([
        listen(client, "user-published", (user, mediaType) => {
          if (user.uid === client.uid) return;
          publishedMap.current[user.uid] |= mediaType === "audio" ? 1 : 2;
          setUsers(users => replaceOrPush(users.slice(), user));
        }),
        listen(client, "user-unpublished", (user, mediaType) => {
          if (user.uid === client.uid) return;
          if ((publishedMap.current[user.uid] &= mediaType === "audio" ? 2 : 1))
            setUsers(users => replaceOrPush(users.slice(), user));
          else {
            delete publishedMap.current[user.uid];
            setUsers(users => users.filter(u => u.uid !== user.uid));
          }
        }),
      ]),
    [client],
  );

  return users;

  function replaceOrPush(array: IAgoraRTCRemoteUser[], item: IAgoraRTCRemoteUser) {
    for (let i = array.length - 1; i >= 0; --i) {
      if (array[i].uid === item.uid) {
        array[i] = item;
        return array;
      }
    }
    array.push(item);
    return array;
  }
}
