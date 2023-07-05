import type { UID } from "agora-rtc-sdk-ng";

export type FetchArgs = (() => Promise<JoinOptions>) | JoinOptions;

export interface JoinOptions {
  appid: string;
  channel: string;
  token: string | null;
  uid?: UID | null;
}

export interface NetworkQuality {
  /**
   * The uplink network quality.
   *
   * It is calculated based on the uplink transmission bitrate, uplink packet loss rate, RTT (round-trip time) and jitter.
   *
   * - 0: The quality is unknown.
   * - 1: The quality is excellent.
   * - 2: The quality is good, but the bitrate is less than optimal.
   * - 3: Users experience slightly impaired communication.
   * - 4: Users can communicate with each other, but not very smoothly.
   * - 5: The quality is so poor that users can barely communicate.
   * - 6: The network is disconnected and users cannot communicate.
   */
  uplink: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * The downlink network quality.
   *
   * It is calculated based on the uplink transmission bitrate, uplink packet loss rate, RTT (round-trip time) and jitter.
   *
   * - 0: The quality is unknown.
   * - 1: The quality is excellent.
   * - 2: The quality is good, but the bitrate is less than optimal.
   * - 3: Users experience slightly impaired communication.
   * - 4: Users can communicate with each other, but not very smoothly.
   * - 5: The quality is so poor that users can barely communicate.
   * - 6: The network is disconnected and users cannot communicate.
   */
  downlink: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * RTT (Round-Trip Time) between the SDK and Agora's edge server, in ms.
   */
  delay: number;
}
