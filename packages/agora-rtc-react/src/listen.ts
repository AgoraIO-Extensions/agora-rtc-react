// TypeScript cannot infer union from overloaded function types
// So duplicate the event types here
import type {
  AudioSourceState,
  ChannelMediaRelayError,
  ChannelMediaRelayEvent,
  ChannelMediaRelayState,
  ConnectionDisconnectedReason,
  ConnectionState,
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  IBufferSourceAudioTrack,
  ILocalTrack,
  ILocalVideoTrack,
  IRemoteTrack,
  IRemoteVideoTrack,
  NetworkQuality,
  RemoteStreamType,
  UID,
} from "agora-rtc-sdk-ng";
import type { Disposer, Fn } from "./utils";

// The following `declare` types are not exported well, so copy them here
export declare class AgoraRTCError extends Error {
  readonly code: `${AgoraRTCErrorCode}`;
  readonly message: string;
  readonly data?: any;
  readonly name: string;
  constructor(code: `${AgoraRTCErrorCode}`, message?: string, data?: any);
  toString(): string;
  print(level?: "error" | "warning"): AgoraRTCError;
  throw(): never;
}

export declare enum AgoraRTCErrorCode {
  UNEXPECTED_ERROR = "UNEXPECTED_ERROR",
  UNEXPECTED_RESPONSE = "UNEXPECTED_RESPONSE",
  TIMEOUT = "TIMEOUT",
  INVALID_PARAMS = "INVALID_PARAMS",
  NOT_READABLE = "NOT_READABLE",
  NOT_SUPPORTED = "NOT_SUPPORTED",
  INVALID_OPERATION = "INVALID_OPERATION",
  OPERATION_ABORTED = "OPERATION_ABORTED",
  WEB_SECURITY_RESTRICT = "WEB_SECURITY_RESTRICT",
  EXCHANGE_SDP_FAILED = "EXCHANGE_SDP_FAILED",
  NETWORK_ERROR = "NETWORK_ERROR",
  NETWORK_TIMEOUT = "NETWORK_TIMEOUT",
  NETWORK_RESPONSE_ERROR = "NETWORK_RESPONSE_ERROR",
  API_INVOKE_TIMEOUT = "API_INVOKE_TIMEOUT",
  ENUMERATE_DEVICES_FAILED = "ENUMERATE_DEVICES_FAILED",
  DEVICE_NOT_FOUND = "DEVICE_NOT_FOUND",
  ELECTRON_IS_NULL = "ELECTRON_IS_NULL",
  ELECTRON_DESKTOP_CAPTURER_GET_SOURCES_ERROR = "ELECTRON_DESKTOP_CAPTURER_GET_SOURCES_ERROR",
  CHROME_PLUGIN_NO_RESPONSE = "CHROME_PLUGIN_NO_RESPONSE",
  CHROME_PLUGIN_NOT_INSTALL = "CHROME_PLUGIN_NOT_INSTALL",
  MEDIA_OPTION_INVALID = "MEDIA_OPTION_INVALID",
  PERMISSION_DENIED = "PERMISSION_DENIED",
  CONSTRAINT_NOT_SATISFIED = "CONSTRAINT_NOT_SATISFIED",
  TRACK_IS_DISABLED = "TRACK_IS_DISABLED",
  GET_VIDEO_ELEMENT_VISIBLE_ERROR = "GET_VIDEO_ELEMENT_VISIBLE_ERROR",
  SHARE_AUDIO_NOT_ALLOWED = "SHARE_AUDIO_NOT_ALLOWED",
  LOW_STREAM_ENCODING_ERROR = "LOW_STREAM_ENCODING_ERROR",
  SET_ENCODING_PARAMETER_ERROR = "SET_ENCODING_PARAMETER_ERROR",
  TRACK_STATE_UNREACHABLE = "TRACK_STATE_UNREACHABLE",
  INVALID_UINT_UID_FROM_STRING_UID = "INVALID_UINT_UID_FROM_STRING_UID",
  CAN_NOT_GET_PROXY_SERVER = "CAN_NOT_GET_PROXY_SERVER",
  CAN_NOT_GET_GATEWAY_SERVER = "CAN_NOT_GET_GATEWAY_SERVER",
  VOID_GATEWAY_ADDRESS = "VOID_GATEWAY_ADDRESS",
  UID_CONFLICT = "UID_CONFLICT",
  MULTI_UNILBS_RESPONSE_ERROR = "MULTI_UNILBS_RESPONSE_ERROR",
  UPDATE_TICKET_FAILED = "UPDATE_TICKET_FAILED",
  INVALID_LOCAL_TRACK = "INVALID_LOCAL_TRACK",
  INVALID_TRACK = "INVALID_TRACK",
  SENDER_NOT_FOUND = "SENDER_NOT_FOUND",
  CREATE_OFFER_FAILED = "CREATE_OFFER_FAILED",
  SET_ANSWER_FAILED = "SET_ANSWER_FAILED",
  ICE_FAILED = "ICE_FAILED",
  PC_CLOSED = "PC_CLOSED",
  SENDER_REPLACE_FAILED = "SENDER_REPLACE_FAILED",
  GET_LOCAL_CAPABILITIES_FAILED = "GET_LOCAL_CAPABILITIES_FAILED",
  GET_LOCAL_CONNECTION_PARAMS_FAILED = "GET_LOCAL_CONNECTION_PARAMS_FAILED",
  SUBSCRIBE_FAILED = "SUBSCRIBE_FAILED",
  UNSUBSCRIBE_FAILED = "UNSUBSCRIBE_FAILED",
  GATEWAY_P2P_LOST = "GATEWAY_P2P_LOST",
  NO_ICE_CANDIDATE = "NO_ICE_CANDIDATE",
  CAN_NOT_PUBLISH_MULTIPLE_VIDEO_TRACKS = "CAN_NOT_PUBLISH_MULTIPLE_VIDEO_TRACKS",
  EXIST_DISABLED_VIDEO_TRACK = "EXIST_DISABLED_VIDEO_TRACK",
  INVALID_REMOTE_USER = "INVALID_REMOTE_USER",
  REMOTE_USER_IS_NOT_PUBLISHED = "REMOTE_USER_IS_NOT_PUBLISHED",
  CUSTOM_REPORT_SEND_FAILED = "CUSTOM_REPORT_SEND_FAILED",
  CUSTOM_REPORT_FREQUENCY_TOO_HIGH = "CUSTOM_REPORT_FREQUENCY_TOO_HIGH",
  FETCH_AUDIO_FILE_FAILED = "FETCH_AUDIO_FILE_FAILED",
  READ_LOCAL_AUDIO_FILE_ERROR = "READ_LOCAL_AUDIO_FILE_ERROR",
  DECODE_AUDIO_FILE_FAILED = "DECODE_AUDIO_FILE_FAILED",
  WS_ABORT = "WS_ABORT",
  WS_DISCONNECT = "WS_DISCONNECT",
  WS_ERR = "WS_ERR",
  LIVE_STREAMING_TASK_CONFLICT = "LIVE_STREAMING_TASK_CONFLICT",
  LIVE_STREAMING_INVALID_ARGUMENT = "LIVE_STREAMING_INVALID_ARGUMENT",
  LIVE_STREAMING_INTERNAL_SERVER_ERROR = "LIVE_STREAMING_INTERNAL_SERVER_ERROR",
  LIVE_STREAMING_PUBLISH_STREAM_NOT_AUTHORIZED = "LIVE_STREAMING_PUBLISH_STREAM_NOT_AUTHORIZED",
  LIVE_STREAMING_TRANSCODING_NOT_SUPPORTED = "LIVE_STREAMING_TRANSCODING_NOT_SUPPORTED",
  LIVE_STREAMING_CDN_ERROR = "LIVE_STREAMING_CDN_ERROR",
  LIVE_STREAMING_INVALID_RAW_STREAM = "LIVE_STREAMING_INVALID_RAW_STREAM",
  LIVE_STREAMING_WARN_STREAM_NUM_REACH_LIMIT = "LIVE_STREAMING_WARN_STREAM_NUM_REACH_LIMIT",
  LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE = "LIVE_STREAMING_WARN_FAILED_LOAD_IMAGE",
  LIVE_STREAMING_WARN_FREQUENT_REQUEST = "LIVE_STREAMING_WARN_FREQUENT_REQUEST",
  WEBGL_INTERNAL_ERROR = "WEBGL_INTERNAL_ERROR",
  BEAUTY_PROCESSOR_INTERNAL_ERROR = "BEAUTY_PROCESSOR_INTERNAL_ERROR",
  CROSS_CHANNEL_WAIT_STATUS_ERROR = "CROSS_CHANNEL_WAIT_STATUS_ERROR",
  CROSS_CHANNEL_FAILED_JOIN_SRC = "CROSS_CHANNEL_FAILED_JOIN_SEC",
  CROSS_CHANNEL_FAILED_JOIN_DEST = "CROSS_CHANNEL_FAILED_JOIN_DEST",
  CROSS_CHANNEL_FAILED_PACKET_SENT_TO_DEST = "CROSS_CHANNEL_FAILED_PACKET_SENT_TO_DEST",
  CROSS_CHANNEL_SERVER_ERROR_RESPONSE = "CROSS_CHANNEL_SERVER_ERROR_RESPONSE",
  METADATA_OUT_OF_RANGE = "METADATA_OUT_OF_RANGE",
  LOCAL_AEC_ERROR = "LOCAL_AEC_ERROR",
  INVALID_PLUGIN = "INVALID_PLUGIN",
  DISCONNECT_P2P = "DISCONNECT_P2P",
  INIT_WEBSOCKET_TIMEOUT = "INIT_WEBSOCKET_TIMEOUT",
  CONVERTING_IMAGEDATA_TO_BLOB_FAILED = "CONVERTING_IMAGEDATA_TO_BLOB_FAILED",
  CONVERTING_VIDEO_FRAME_TO_BLOB_FAILED = "CONVERTING_VIDEO_FRAME_TO_BLOB_FAILED",
  INIT_DATACHANNEL_TIMEOUT = "INIT_DATACHANNEL_TIMEOUT",
  DATACHANNEL_CONNECTION_TIMEOUT = "DATACHANNEL_CONNECTION_TIMEOUT",
}

export declare enum InspectState {
  CONNECTING = "CONNECTING",
  RECONNECTING = "RECONNECTING",
  CONNECTED = "CONNECTED",
  CLOSED = "CLOSED",
}

export declare type CheckVideoVisibleResult =
  | { visible: true }
  | {
      visible: false;
      reason: `${VisibleHiddenReason}`;
    };

export declare enum VisibleHiddenReason {
  COVERED = "COVERED",
  POSITION = "POSITION",
  SIZE = "SIZE",
  STYLE = "STYLE",
}

export interface Listenable {
  on: (event: any, listener: Fn) => void;
  off: (event: any, listener: Fn) => void;
}

/**
 * Listen to client or track events
 */
export function listen(client: IAgoraRTCClient, event: "connection-state-change", listener: (curState: ConnectionState, revState: ConnectionState, reason?: ConnectionDisconnectedReason) => void): Disposer;
export function listen(client: IAgoraRTCClient, event: "user-joined", listener: (user: IAgoraRTCRemoteUser) => void): Disposer;
export function listen(client: IAgoraRTCClient, event: "user-left", listener: (user: IAgoraRTCRemoteUser, reason: "Quit" | "ServerTimeOut" | "BecomeAudience") => void): Disposer;
export function listen(client: IAgoraRTCClient, event: "user-published", listener: (user: IAgoraRTCRemoteUser, mediaType: "audio" | "video") => void): Disposer;
export function listen(client: IAgoraRTCClient, event: "user-unpublished", listener: (user: IAgoraRTCRemoteUser, mediaType: "audio" | "video") => void): Disposer;
export function listen(client: IAgoraRTCClient, event: "user-info-updated", listener: (uid: UID, msg: `${"mute" | "unmute"}-${"audio" | "video"}` | `${"enable" | "disable"}-local-video`) => void): Disposer;
export function listen(client: IAgoraRTCClient, event: "media-reconnect-start", listener: (uid: UID) => void): Disposer;
export function listen(client: IAgoraRTCClient, event: "media-reconnect-end", listener: (uid: UID) => void): Disposer;
export function listen(client: IAgoraRTCClient, event: "stream-type-changed", listener: (uid: UID, streamType: RemoteStreamType) => void): Disposer;
export function listen(client: IAgoraRTCClient, event: "stream-fallback", listener: (uid: UID, isFallbackOrRecover: "fallback" | "recover") => void): Disposer;
export function listen(client: IAgoraRTCClient, event: "channel-media-relay-state", listener: (state: ChannelMediaRelayState, code: ChannelMediaRelayError) => void): Disposer;
export function listen(client: IAgoraRTCClient, event: "channel-media-relay-event", listener: (event: ChannelMediaRelayEvent) => void): Disposer;
export function listen(client: IAgoraRTCClient, event: "volume-indicator", listener: (result: { uid: UID; level: number }[]) => void): Disposer;
export function listen(client: IAgoraRTCClient, event: "crypt-error", listener: () => void): Disposer;
export function listen(client: IAgoraRTCClient, event: "token-privilege-will-expire", listener: () => void): Disposer;
export function listen(client: IAgoraRTCClient, event: "token-privilege-did-expire", listener: () => void): Disposer;
export function listen(client: IAgoraRTCClient, event: "network-quality", listener: (stats: NetworkQuality) => void): Disposer;
export function listen(client: IAgoraRTCClient, event: "live-streaming-error", listener: (url: string, err: AgoraRTCError) => void): Disposer;
export function listen(client: IAgoraRTCClient, event: "live-streaming-warning", listener: (url: string, err: AgoraRTCError) => void): Disposer;
export function listen(client: IAgoraRTCClient, event: "exception", listener: (event: { code: number, msg: string, uid: UID }) => void): Disposer;
export function listen(client: IAgoraRTCClient, event: "is-using-cloud-proxy", listener: (isUsingProxy: boolean) => void): Disposer;
export function listen(client: IAgoraRTCClient, event: "join-fallback-to-proxy", listener: (proxyServer: string) => void): Disposer;
export function listen(client: IAgoraRTCClient, event: "published-user-list", listener: (user: IAgoraRTCRemoteUser) => void): Disposer;
export function listen(client: IAgoraRTCClient, event: "content-inspect-connection-state-change", listener: (preState: `${InspectState}`, newState: `${InspectState}`) => void): Disposer;
export function listen(client: IAgoraRTCClient, event: "content-inspect-error", listener: (error?: AgoraRTCError) => void): Disposer;
export function listen(client: ILocalTrack, event: "track-ended", listener: () => void): Disposer;
export function listen(client: IBufferSourceAudioTrack, event: "source-state-change", listener: (currentState: AudioSourceState) => void): Disposer;
export function listen(client: ILocalVideoTrack, event: "beauty-effect-overload", listener: () => void): Disposer;
export function listen(client: ILocalVideoTrack, event: "track-ended", listener: () => void): Disposer;
export function listen(client: ILocalVideoTrack, event: "video-element-visible-status", listener: () => void): Disposer;
export function listen(client: IRemoteTrack, event: "first-frame-decoded", listener: () => void): Disposer;
export function listen(client: IRemoteVideoTrack, event: "video-element-visible-status", listener: (data?: CheckVideoVisibleResult) => void): Disposer
export function listen(listenable: Listenable, event: string, listener: Fn): Disposer;
export function listen(listenable: Listenable, event: string, listener: Fn) {
  listenable.on(event, listener);
  return () => listenable.off(event, listener);
}
