import type { NetworkQuality, UID } from "agora-rtc-sdk-ng";

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
   * The name of the channel to join. See [`IAgoraRTCClient.join`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartcclient.html#join) for details.
   */
  channel: string;

  /**
   * The token used for authentication. If token-based authentication is enabled for your project, a valid token must be provided. If token-based authentication is not enabled, you can pass `null`. See [`IAgoraRTCClient.join`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartcclient.html#join) for details.
   */
  token: string | null;

  /**
   * The user ID. If not provided, the Agora server assigns a number `uid` for you. See [`IAgoraRTCClient.join`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartcclient.html#join) for details.
   */
  uid?: UID | null;
}

/**
 * The last-mile network quality.
 */
export interface NetworkQualityEx extends NetworkQuality {
  /**
   * The average Round-Trip Time (RTT) from the SDK to the Agora edge server, measured in milliseconds (ms).
   */
  delay: number;
}
