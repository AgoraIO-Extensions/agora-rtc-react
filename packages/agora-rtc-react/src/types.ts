import type { UID } from "agora-rtc-sdk-ng";

export type FetchArgs = (() => Promise<JoinOptions>) | JoinOptions;

/**
 * Parameters used to join a channel.
 */
export interface JoinOptions {
  /**
   * The App ID of your Agora project.
   */
  appid: string;

  /**
   * The name of the channel to join. See [`IAgoraRTCClient.join`](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartcclient.html#join) for details.
   */
  channel: string;

  /**
   * The token used for authentication. If token-based authentication is enabled for your project, a valid token must be provided. If token-based authentication is not enabled, you can pass `null`. See [`IAgoraRTCClient.join`](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartcclient.html#join) for details.
   */
  token: string | null;

  /**
   * The user ID. If not provided, the Agora server assigns a number `uid` for you. See [`IAgoraRTCClient.join`](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartcclient.html#join) for details.
   */
  uid?: UID | null;
}

/**
 * The last-mile network quality.
 */
export interface NetworkQuality {
  /**
   * The uplink network quality. It is calculated based on the uplink transmission bitrate, uplink packet loss rate, RTT (round-trip time) and jitter.0: The quality is unknown.1: The quality is excellent.2: The quality is good, but the bitrate is less than optimal.3: Users experience slightly impaired communication.4: Users can communicate with each other, but not very smoothly.5: The quality is so poor that users can barely communicate.6: The network is disconnected and users cannot communicate.
   */
  uplink: 0 | 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * The downlink network quality. It is calculated based on the uplink transmission bitrate, uplink packet loss rate, RTT (round-trip time) and jitter.0: The quality is unknown.1: The quality is excellent.2: The quality is good, but the bitrate is less than optimal.3: Users experience slightly impaired communication.4: Users can communicate with each other, but not very smoothly.5: The quality is so poor that users can barely communicate.6: The network is disconnected and users cannot communicate.
   */
  downlink: 0 | 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * The average Round-Trip Time (RTT) from the SDK to the Agora edge server, measured in milliseconds (ms).
   */
  delay: number;
}
