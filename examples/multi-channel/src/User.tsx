import styles from "./User.module.css";

import type { UID } from "agora-rtc-sdk-ng";
import type { PropsWithChildren } from "react";

import { useMemo } from "react";
import { fakeName } from "./utils";

export interface UserProps extends PropsWithChildren {
  uid: UID;
}

export function User({ uid, children }: UserProps) {
  const name = useMemo(() => fakeName(uid), [uid]);

  return (
    <div className={styles.user}>
      {children}
      <div className={styles.mask} />
      <label className={styles.label}>{name}</label>
    </div>
  );
}
