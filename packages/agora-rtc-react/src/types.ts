import type { NetworkQuality, UID } from "agora-rtc-sdk-ng";

export type FetchArgs = (() => Promise<JoinOptions>) | JoinOptions;

export interface JoinOptions {
  appid: string;

  channel: string;

  token: string | null;

  uid?: UID | null;
}

export interface NetworkQualityEx extends NetworkQuality {
  delay: number;
}
