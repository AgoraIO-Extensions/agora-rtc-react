import type { IAgoraRTCClient, IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";

import { useRTCClient } from "../hooks/useRTCClient";
import { listen } from "../misc/listen";
import { joinDisposers } from "../misc/utils";

/**
 * 用于获取远端用户列表。
 *
 * @param `client` {IAgoraRTCClient | null} [IAgoraRTCClient](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartcclient.html) 对象。
 * @return IAgoraRTCRemoteUser[] 远端用户列表。
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
