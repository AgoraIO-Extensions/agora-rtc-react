import styles from "./RemoteUserList.module.css";

import type { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";

import { RemoteUser } from "agora-rtc-react";
import { User } from "./User";

export interface RemoteUserListProps {
  users: IAgoraRTCRemoteUser[];
}

export function RemoteUserList({ users }: RemoteUserListProps) {
  return (
    <div className={styles.container}>
      {users.map(user => (
        <User key={user.uid} uid={user.uid}>
          <RemoteUser user={user} />
        </User>
      ))}
    </div>
  );
}
