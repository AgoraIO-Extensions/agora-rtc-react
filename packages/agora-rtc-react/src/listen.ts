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
  ILocalAudioTrack,
  ILocalVideoTrack,
  IRemoteAudioTrack,
  IRemoteVideoTrack,
  NetworkQuality,
  RemoteStreamType,
  UID,
} from "agora-rtc-sdk-ng";

// The following `declare` types are not exported well, so copy them here
declare class AgoraRTCError extends Error {
  readonly code: `${AgoraRTCErrorCode}`;
  readonly message: string;
  readonly data?: any;
  readonly name: string;
  constructor(code: `${AgoraRTCErrorCode}`, message?: string, data?: any);
  toString(): string;
  print(level?: "error" | "warning"): AgoraRTCError;
  throw(): never;
}

declare enum AgoraRTCErrorCode {
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

declare enum InspectState {
  CONNECTING = "CONNECTING",
  RECONNECTING = "RECONNECTING",
  CONNECTED = "CONNECTED",
  CLOSED = "CLOSED",
}

// prettier-ignore
export interface ClientEventMap {
  "connection-state-change": (curState: ConnectionState, revState: ConnectionState, reason?: ConnectionDisconnectedReason) => void;
  "user-joined": (user: IAgoraRTCRemoteUser) => void;
  "user-left": (user: IAgoraRTCRemoteUser, reason: "Quit" | "ServerTimeOut" | "BecomeAudience") => void;
  "user-published": (user: IAgoraRTCRemoteUser, mediaType: "audio" | "video") => void;
  "user-unpublished": (user: IAgoraRTCRemoteUser, mediaType: "audio" | "video") => void;
  "user-info-updated": (uid: UID, msg: `${"mute" | "unmute"}-${"audio" | "video"}` | `${"enable" | "disable"}-local-video`) => void;
  "media-reconnect-start": (uid: UID) => void;
  "media-reconnect-end": (uid: UID) => void;
  "stream-type-changed": (uid: UID, streamType: RemoteStreamType) => void;
  "stream-fallback": (uid: UID, isFallbackOrRecover: "fallback" | "recover") => void;
  "channel-media-relay-state": (state: ChannelMediaRelayState, code: ChannelMediaRelayError) => void;
  "channel-media-relay-event": (event: ChannelMediaRelayEvent) => void;
  "volume-indicator": (result: { uid: UID; level: number }[]) => void;
  "crypt-error": () => void;
  "token-privilege-will-expire": () => void;
  "token-privilege-did-expire": () => void;
  "network-quality": (stats: NetworkQuality) => void;
  "live-streaming-error": (url: string, err: AgoraRTCError) => void;
  "live-streaming-warning": (url: string, err: AgoraRTCError) => void;
  "exception": (event: { code: number, msg: string, uid: UID }) => void;
  "is-using-cloud-proxy": (isUsingProxy: boolean) => void;
  "join-fallback-to-proxy": (proxyServer: string) => void;
  "published-user-list": (user: IAgoraRTCRemoteUser) => void;
  "content-inspect-connection-state-change": (preState: `${InspectState}`, newState: `${InspectState}`) => void;
  "content-inspect-error": (error?: AgoraRTCError) => void;
}

export interface LocalTrackEventMap {
  "track-ended": () => void;
}

export interface LocalAudioTrackEventMap extends LocalTrackEventMap {}

export interface BufferSourceAudioTrackEventMap extends LocalAudioTrackEventMap {
  "source-state-change": (currentState: AudioSourceState) => void;
}

declare type CheckVideoVisibleResult =
  | { visible: true }
  | {
      visible: false;
      reason: `${VisibleHiddenReason}`;
    };

declare enum VisibleHiddenReason {
  COVERED = "COVERED",
  POSITION = "POSITION",
  SIZE = "SIZE",
  STYLE = "STYLE",
}

export interface LocalVideoTrackEventMap extends LocalTrackEventMap {
  "beauty-effect-overload": () => void;
  "track-ended": () => void;
  "video-element-visible-status": (data?: CheckVideoVisibleResult) => void;
}

export interface RemoteTrackEventMap {
  "first-frame-decoded": () => void;
}

export interface RemoteAudioTrackEventMap extends RemoteTrackEventMap {}

export interface RemoteVideoTrackEventMap extends RemoteTrackEventMap {
  "first-frame-decoded": () => void;
  "video-element-visible-status": (data?: CheckVideoVisibleResult) => void;
}

export function listen<E extends keyof ClientEventMap>(
  client: IAgoraRTCClient,
  event: E,
  callback: ClientEventMap[E],
): () => void;
export function listen<E extends keyof LocalAudioTrackEventMap>(
  client: ILocalAudioTrack,
  event: E,
  callback: LocalAudioTrackEventMap[E],
): () => void;
export function listen<E extends keyof LocalVideoTrackEventMap>(
  client: ILocalVideoTrack,
  event: E,
  callback: LocalVideoTrackEventMap[E],
): () => void;
export function listen<E extends keyof RemoteAudioTrackEventMap>(
  client: IRemoteAudioTrack,
  event: E,
  callback: RemoteAudioTrackEventMap[E],
): () => void;
export function listen<E extends keyof RemoteVideoTrackEventMap>(
  client: IRemoteVideoTrack,
  event: E,
  callback: RemoteVideoTrackEventMap[E],
): () => void;
export function listen(client_or_track: any, event: string, callback: (...args: any[]) => void) {
  client_or_track.on(event, callback);
  return () => client_or_track.off(event, callback);
}
