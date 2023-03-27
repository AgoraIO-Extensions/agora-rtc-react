import styles from "./RemoteUserList.module.css";

import type { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";

import { RemoteUser } from "agora-rtc-react";
import { useMemo } from "react";
import { fakeName } from "./utils";

export interface RemoteUserListProps {
  users: IAgoraRTCRemoteUser[];
}

export function RemoteUserList({ users }: RemoteUserListProps) {
  return (
    <div className={styles.container}>
      {users.map(user => (
        <RemoteUserListItem key={user.uid} user={user} />
      ))}
    </div>
  );
}

function RemoteUserListItem({ user }: { user: IAgoraRTCRemoteUser }) {
  const name = useMemo(() => fakeName(user.uid), [user.uid]);

  return (
    <div className={styles.user}>
      <RemoteUser user={user} />
      <div className={styles.mask}></div>
      <label className={styles.label}>{name}</label>
    </div>
  );
}
