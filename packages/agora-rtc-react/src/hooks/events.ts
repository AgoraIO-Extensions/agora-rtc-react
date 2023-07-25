import type {
  AudioSourceState,
  ChannelMediaRelayError,
  ChannelMediaRelayEvent,
  ChannelMediaRelayState,
  ConnectionDisconnectedReason,
  ConnectionState,
  IAgoraRTCClient,
  IAgoraRTCError,
  IAgoraRTCRemoteUser,
  IBufferSourceAudioTrack,
  ILocalTrack,
  ILocalVideoTrack,
  IRemoteTrack,
  IRemoteVideoTrack,
  ITrack,
  NetworkQuality,
  RemoteStreamType,
  UID,
} from "agora-rtc-sdk-ng";
import { useEffect, useRef } from "react";

import type { CheckVideoVisibleResult, InspectState } from "../misc/listen";
import { listen } from "../misc/listen";
import type { Fn, Nullable } from "../misc/utils";

import { useIsomorphicLayoutEffect } from "./tools";

/**
 * Occurs when the state of the connection between the SDK and the server changes.
 */
export function useClientEvent(
  client: Nullable<IAgoraRTCClient>,
  event: "connection-state-change",
  listener: Nullable<
    (
      curState: ConnectionState,
      revState: ConnectionState,
      reason?: ConnectionDisconnectedReason,
    ) => void
  >,
): void;

/**
 * Occurs when a remote user or host joins the channel.
 *
 * - In a communication channel, this callback indicates that another user joins the channel and reports the ID of that user. The SDK also triggers this callback to report the existing users in the channel when a user joins the channel.
 * - In a live-broadcast channel, this callback indicates that a host joins the channel. The SDK also triggers this callback to report the existing hosts in the channel when a user joins the channel. Ensure that you have no more than 17 hosts in a channel.
 *
 * The SDK triggers this callback when one of the following situations occurs:
 * - A remote user or host joins the channel by calling {@link join}.
 * - A remote audience switches the user role to host by calling {@link setClientRole} after joining the channel.
 * - A remote user or host rejoins the channel after a network interruption.
 */
export function useClientEvent(
  client: Nullable<IAgoraRTCClient>,
  event: "user-joined",
  listener: Nullable<(user: IAgoraRTCRemoteUser) => void>,
): void;

/**
 * Occurs when a remote user becomes offline.
 *
 * The SDK triggers this callback when one of the following situations occurs:
 * - A remote user calls {@link leave} and leaves the channel.
 * - A remote user has dropped offline. If no data packet of the user or host is received for 20 seconds, the SDK assumes that the user has dropped offline. A poor network connection may cause a false positive.
 * - A remote user switches the client role from host to audience.
 *
 * > In live-broadcast channels, the SDK triggers this callback only when a host goes offline.
 */
export function useClientEvent(
  client: Nullable<IAgoraRTCClient>,
  event: "user-left",
  listener: Nullable<
    (user: IAgoraRTCRemoteUser, reason: "Quit" | "ServerTimeOut" | "BecomeAudience") => void
  >,
): void;

/**
 * Occurs when a remote user publishes an audio or video track.
 *
 * You can subscribe to and play the audio or video track in this callback. See {@link subscribe} and [RemoteTrack.play]{@link IRemoteTrack.play}.
 *
 * > The SDK also triggers this callback to report the existing tracks in the channel when a user joins the channel.
 *
 * ```javascript
 * client.on("user-published", async (user, mediaType) => {
 *   await client.subscribe(user, mediaType);
 *   if (mediaType === "video") {
 *     console.log("subscribe video success");
 *     user.videoTrack.play("xxx");
 *   }
 *   if (mediaType === "audio") {
 *     console.log("subscribe audio success");
 *     user.audioTrack.play();
 *   }
 * })
 * ```
 */
export function useClientEvent(
  client: Nullable<IAgoraRTCClient>,
  event: "user-published",
  listener: Nullable<(user: IAgoraRTCRemoteUser, mediaType: "audio" | "video") => void>,
): void;

/**
 * Occurs when a remote user unpublishes an audio or video track.
 */
export function useClientEvent(
  client: Nullable<IAgoraRTCClient>,
  event: "user-unpublished",
  listener: Nullable<(user: IAgoraRTCRemoteUser, mediaType: "audio" | "video") => void>,
): void;

/**
 * Reports the state change of users.
 *
 * In most cases, you only need to listen for [user-published]{@link IAgoraRTCClient.event_user_published} and [user-unpublished]{@link IAgoraRTCClient.event_user_unpublished} events for operations including subscribing, unsubscribing, and displaying whether the remote user turns on the camera and microphone. You do not need to pay special attention to user states since the SDK automatically handles user states.
 *
 * > This event indicating the media stream of a remote user is active does not necessarily mean that the local user can subscribe to this remote user. The local user can subscribe to a remote user only when receiving the [user-published]{@link IAgoraRTCClient.event_user_published} event.
 */
export function useClientEvent(
  client: Nullable<IAgoraRTCClient>,
  event: "user-info-updated",
  listener: Nullable<
    (
      uid: UID,
      msg: `${"mute" | "unmute"}-${"audio" | "video"}` | `${"enable" | "disable"}-local-video`,
    ) => void
  >,
): void;

/**
 * Occurs when the SDK starts to reestablish the media connection for publishing and subscribing.
 */
export function useClientEvent(
  client: Nullable<IAgoraRTCClient>,
  event: "media-reconnect-start",
  listener: Nullable<(uid: UID) => void>,
): void;

/**
 * Occurs when the SDK ends reestablishing the media connection for publishing and subscribing.
 */
export function useClientEvent(
  client: Nullable<IAgoraRTCClient>,
  event: "media-reconnect-end",
  listener: Nullable<(uid: UID) => void>,
): void;

/**
 * Occurs when the type of a remote video stream changes.
 *
 * The SDK triggers this callback when a high-quality video stream changes to a low-quality video stream, or vice versa.
 */
export function useClientEvent(
  client: Nullable<IAgoraRTCClient>,
  event: "stream-type-changed",
  listener: Nullable<(uid: UID, streamType: RemoteStreamType) => void>,
): void;

/**
 * Occurs when a remote video stream falls back to an audio stream due to unreliable network conditions or switches back to video after the network conditions improve.
 */
export function useClientEvent(
  client: Nullable<IAgoraRTCClient>,
  event: "stream-fallback",
  listener: Nullable<(uid: UID, isFallbackOrRecover: "fallback" | "recover") => void>,
): void;

/**
 * Occurs when the state of the media stream relay changes.
 *
 * The SDK reports the state and error code of the current media relay with this callback.
 *
 * If the media relay is in an abnormal state, you can find the error code in {@link ChannelMediaRelayError} (for example if the token has expired, or repeated reconnection attempts fail.)
 */
export function useClientEvent(
  client: Nullable<IAgoraRTCClient>,
  event: "channel-media-relay-state",
  listener: Nullable<(state: ChannelMediaRelayState, code: ChannelMediaRelayError) => void>,
): void;

/**
 * Reports events during a media stream relay.
 */
export function useClientEvent(
  client: Nullable<IAgoraRTCClient>,
  event: "channel-media-relay-event",
  listener: Nullable<(event: ChannelMediaRelayEvent) => void>,
): void;

/**
 * Reports all the speaking remote users and their volumes.
 *
 * It is disabled by default. You can enable this callback by calling {@link enableAudioVolumeIndicator}.
 * If enabled, it reports the users' volumes every two seconds regardless of whether there are users speaking.
 *
 * The volume is an integer ranging from 0 to 100. Usually a user with volume above 60 is a speaking user.
 *
 * ``` javascript
 * client.on("volume-indicator", function(result){
 *     result.forEach(function(volume, index){
 *     console.log(`${index} UID ${volume.uid} Level ${volume.level}`);
 *   });
 * });
 * ```
 */
export function useClientEvent(
  client: Nullable<IAgoraRTCClient>,
  event: "volume-indicator",
  listener: Nullable<(result: { uid: UID; level: number }[]) => void>,
): void;

/**
 * Occurs when decryption fails.
 *
 * The SDK triggers this callback when the decryption fails during the process of subscribing to a stream. The failure is usually caused by incorrect encryption settings. See {@link setEncryptionConfig} for details.
 */
export function useClientEvent(
  client: Nullable<IAgoraRTCClient>,
  event: "crypt-error",
  listener: Nullable<() => void>,
): void;

/**
 * Occurs 30 seconds before a token expires.
 *
 * You must request a new token from your server and call {@link renewToken} to pass a new token as soon as possible.
 *
 * ``` javascript
 * client.on("token-privilege-will-expire", async function(){
 *   // After requesting a new token
 *   await client.renewToken(token);
 * });
 * ```
 */
export function useClientEvent(
  client: Nullable<IAgoraRTCClient>,
  event: "token-privilege-will-expire",
  listener: Nullable<() => void>,
): void;

/**
 * Occurs when the token expires.
 *
 * You must request a new token from your server and call {@link join} to use the new token to join the channel.
 *
 * ``` javascript
 * client.on("token-privilege-did-expire", async () => {
 *   // After requesting a new token
 *   await client.join(<APPID>, <CHANNEL NAME>, <NEW TOKEN>);
 * });
 * ```
 */
export function useClientEvent(
  client: Nullable<IAgoraRTCClient>,
  event: "token-privilege-did-expire",
  listener: Nullable<() => void>,
): void;

/**
 * Reports the network quality of the local user.
 *
 * After the local user joins the channel, the SDK triggers this callback to report the uplink and downlink network conditions of the local user once every two second.
 *
 * > Agora recommends listening for this event and displaying the network quality.
 */
export function useClientEvent(
  client: Nullable<IAgoraRTCClient>,
  event: "network-quality",
  listener: Nullable<(stats: NetworkQuality) => void>,
): void;

/**
 * Occurs when an error occurs in CDN live streaming.
 *
 * After the method call of {@link startLiveStreaming} succeeds, the SDK triggers this callback when errors occur during CDN live streaming.
 *
 * You can visit `err.code` to get the error code. The errors that you may encounter include:
 * - `LIVE_STREAMING_INVALID_ARGUMENT`: Invalid argument.
 * - `LIVE_STREAMING_INTERNAL_SERVER_ERROR`: An error occurs in Agora's streaming server.
 * - `LIVE_STREAMING_PUBLISH_STREAM_NOT_AUTHORIZED`: The URL is occupied.
 * - `LIVE_STREAMING_TRANSCODING_NOT_SUPPORTED`: Sets the transcoding parameters when the transcoding is not enabled.
 * - `LIVE_STREAMING_CDN_ERROR`: An error occurs in the CDN.
 * - `LIVE_STREAMING_INVALID_RAW_STREAM`: Timeout for the CDN live streaming. Please check your media stream.
 */
export function useClientEvent(
  client: Nullable<IAgoraRTCClient>,
  event: "live-streaming-error",
  listener: Nullable<(url: string, err: IAgoraRTCError) => void>,
): void;

/**
 * Occurs when a warning occurs in CDN live streaming.
 *
 * After the method call of {@link startLiveStreaming} succeeds, the SDK triggers this callback when warnings occur during CDN live streaming.
 *
 * You can visit `err.code` to get the warning code. The warnings that you may encounter include:
 * - `LIVE_STREAMING_WARN_STREAM_NUM_REACH_LIMIT`: Pushes stremas to more than 10 URLs.
 * - `LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE`: Fails to load the background image or watermark image.
 * - `LIVE_STREAMING_WARN_FREQUENT_REQUEST`: Pushes stremas to the CDN too frequently.
 */
export function useClientEvent(
  client: Nullable<IAgoraRTCClient>,
  event: "live-streaming-warning",
  listener: Nullable<(url: string, err: IAgoraRTCError) => void>,
): void;

/**
 * Reports exceptions in the channel.
 *
 * Exceptions are not errors, but usually reflect quality issues.
 *
 * This callback also reports recovery from an exception.
 *
 * Each exception corresponds to a recovery event.
 *
 * **Exception**
 *
 * | Code | Message                   | Exception            |
 * | :----- | :------------------------- | :--------------- |
 * | 1001   | FRAMERATE_INPUT_TOO_LOW    | Captured video frame rate is too low |
 * | 1002   | FRAMERATE_SENT_TOO_LOW     | Sent video frame rate is too low |
 * | 1003   | SEND_VIDEO_BITRATE_TOO_LOW | Sent video bitrate is too low |
 * | 1005   | RECV_VIDEO_DECODE_FAILED   | Decoding received video fails |
 * | 2001   | AUDIO_INPUT_LEVEL_TOO_LOW  | Sent audio volume is too low     |
 * | 2002   | AUDIO_OUTPUT_LEVEL_TOO_LOW | Received audio volume is too low     |
 * | 2003   | SEND_AUDIO_BITRATE_TOO_LOW | Sent audio bitrate is too low |
 * | 2005   | RECV_AUDIO_DECODE_FAILED   | Decoding received audio fails |
 *
 * **Recoveries**
 *
 * | Code | Message                   | Recovery             |
 * | :----- | :------------------------- | :--------------- |
 * |3001   | FRAMERATE_INPUT_TOO_LOW_RECOVER    | Captured video frame rate recovers |
 * |3002   | FRAMERATE_SENT_TOO_LOW_RECOVER     | Sent video frame rate recovers |
 * |3003   | SEND_VIDEO_BITRATE_TOO_LOW_RECOVER | Sent video bitrate recovers |
 * |3005   | RECV_VIDEO_DECODE_FAILED_RECOVER   | Decoding received video recovers |
 * |4001   | AUDIO_INPUT_LEVEL_TOO_LOW_RECOVER  | Sent audio volume recovers     |
 * |4002   | AUDIO_OUTPUT_LEVEL_TOO_LOW_RECOVER | Received audio volume recovers     |
 * |4003   | SEND_AUDIO_BITRATE_TOO_LOW_RECOVER | Sent audio bitrate recovers |
 * |4005   | RECV_AUDIO_DECODE_FAILED_RECOVER   | Decoding received audio recovers |
 */
export function useClientEvent(
  client: Nullable<IAgoraRTCClient>,
  event: "exception",
  listener: Nullable<(event: { code: number; msg: string; uid: UID }) => void>,
): void;

/**
 * **Since**
 * <br>&emsp;&emsp;&emsp;*4.4.0*
 *
 * The SDK triggers this callback to indicate whether the media stream is forwarded by the Agora cloud proxy service.
 * - Earlier than v4.10.0: The callback is triggered after the method call of [[publish]] succeeds.
 * - v4.10.0 and later: The callback is triggered after the method call of [[join]] succeeds.
 */
export function useClientEvent(
  client: Nullable<IAgoraRTCClient>,
  event: "is-using-cloud-proxy",
  listener: Nullable<(isUsingProxy: boolean) => void>,
): void;

/**
 * **Since**
 * <br>&emsp;&emsp;&emsp;*4.9.0*
 *
 * Occurs when the SDK automatically switches to TCP/TLS 443.
 *
 * As of v4.11.0, if the SDK fails in the attempt to directly connect to Agora SD-RTN™ after you call [[join]],
 * the SDK automatically switches to TCP/TLS 443 in order to ensure connectivity.
 */
export function useClientEvent(
  client: Nullable<IAgoraRTCClient>,
  event: "join-fallback-to-proxy",
  listener: Nullable<(proxyServer: string) => void>,
): void;

/**
 * **Since**
 * <br>&emsp;&emsp;&emsp;*4.11.0*
 *
 * If you enable support for 128 hosts in a channel, this callback is triggered when [[join]] is called.
 * The callback reports remote users who publish audio and/or video tracks in the channel.
 *
 * > Note:
 * > - For the `published-user-list` to be triggered, every user in the channel must use a number as their user ID (`uid`).
 * > - `published-user-list` has the following impacts on [AgoraRTCClient.on("user-joined")]{@link event_user_joined} and [AgoraRTCClient.on("user-published")]{@link event_user_published}:
 * >   - If you listen for the `published-user-list` event, users reported by the `published-user-list` callback are not reported by `user-joined` and `user-published`.
 * >   - If you do not listen for the `published-user-list` event, the `user-joined` and `user-published` callbacks are not affected.
 */
export function useClientEvent(
  client: Nullable<IAgoraRTCClient>,
  event: "published-user-list",
  listener: Nullable<(user: IAgoraRTCRemoteUser) => void>,
): void;

/**
 * Occurs when the state of the connection between the SDK and the server changes.
 */
export function useClientEvent(
  client: Nullable<IAgoraRTCClient>,
  event: "content-inspect-connection-state-change",
  listener: Nullable<(preState: `${InspectState}`, newState: `${InspectState}`) => void>,
): void;

/**
 * Occurs when the state of the connection between the SDK and the server changes.
 */
export function useClientEvent(
  client: Nullable<IAgoraRTCClient>,
  event: "content-inspect-error",
  listener: Nullable<(error?: IAgoraRTCError) => void>,
): void;
export function useClientEvent(
  client: Nullable<IAgoraRTCClient>,
  event: string,
  listener: Nullable<Fn>,
) {
  const listenerRef = useRef<Nullable<Fn>>(listener);

  useIsomorphicLayoutEffect(() => {
    listenerRef.current = listener;
  }, [listener]);

  useEffect(() => {
    if (client) {
      return listen(client, event, (...args: unknown[]) => {
        if (listenerRef.current) {
          listenerRef.current(...args);
        }
      });
    }
  }, [event, client]);
}

/**
 * Occurs when a audio or video track ends.
 *
 * Reasons may include:
 * - Camera is unplugged.
 * - Microphone is unplugged.
 * - The local user stops screen sharing.
 * - The local user closes the underlying `MediaStreamTrack`.
 * - A local media device malfunctions.
 * - The device permission is revoked.
 */
export function useTrackEvent(
  track: Nullable<ILocalTrack>,
  event: "track-ended",
  listener: Nullable<() => void>,
): void;

/**
 * Occurs when the state of processing the audio buffer in [BufferSourceAudioTrack]{@link IBufferSourceAudioTrack} changes.
 */
export function useTrackEvent(
  track: Nullable<IBufferSourceAudioTrack>,
  event: "source-state-change",
  listener: Nullable<(currentState: AudioSourceState) => void>,
): void;

/**
 * Occurs when a audio or video track ends.
 *
 * Reasons may include:
 * - Camera is unplugged.
 * - Microphone is unplugged.
 * - The local user stops screen sharing.
 * - The local user closes the underlying `MediaStreamTrack`.
 * - A local media device malfunctions.
 * - The device permission is revoked.
 */
export function useTrackEvent(
  track: Nullable<ILocalVideoTrack>,
  event: "track-ended",
  listener: Nullable<() => void>,
): void;

/**
 * **Since**
 * <br>&emsp;&emsp;&emsp;*4.8.0*
 *
 * Indicates the visibility of the `<video>` HTML tag.
 *
 * The SDK triggers this event every 30 seconds.
 *
 * After you call `localVideoTrack.play`, the SDK creates an [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) tag for playing video tracks. When `localVideoTrack.isPlaying` is `true` but you cannot see any video, this event helps you check whether the `<video>` tag is visible or not and learn the reason when the `<video>` tag is invisible.
 */
export function useTrackEvent(
  track: Nullable<ILocalVideoTrack>,
  event: "video-element-visible-status",
  listener: Nullable<() => void>,
): void;

/**
 * Occurs when the first remote audio or video frame is decoded.
 */
export function useTrackEvent(
  track: Nullable<IRemoteTrack>,
  event: "first-frame-decoded",
  listener: Nullable<() => void>,
): void;

/**
 * **Since**
 * <br>&emsp;&emsp;&emsp;*4.8.0*
 *
 * Indicates the visibility of the `<video>` HTML tag.
 *
 * The SDK triggers this event every 30 seconds.
 *
 * After you call `localVideoTrack.play`, the SDK creates an [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video) tag for playing video tracks. When `localVideoTrack.isPlaying` is `true` but you cannot see any video, this event helps you check whether the `<video>` tag is visible or not and learn the reason when the `<video>` tag is invisible.
 */
export function useTrackEvent(
  track: Nullable<IRemoteVideoTrack>,
  event: "video-element-visible-status",
  listener: Nullable<(data?: CheckVideoVisibleResult) => void>,
): void;
export function useTrackEvent(track: Nullable<ITrack>, event: string, listener: Nullable<Fn>) {
  const listenerRef = useRef(listener);

  useIsomorphicLayoutEffect(() => {
    listenerRef.current = listener;
  }, [listener]);

  useEffect(() => {
    if (track) {
      return listen(track, event, (...args: unknown[]) => {
        if (listenerRef.current) {
          listenerRef.current(...args);
        }
      });
    }
  }, [event, track]);
}
