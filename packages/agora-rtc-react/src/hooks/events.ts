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
  ITrack,
  NetworkQuality,
  RemoteStreamType,
  UID,
} from "agora-rtc-sdk-ng";
import type { AgoraRTCError, CheckVideoVisibleResult, InspectState } from "../listen";
import type { Fn, Nullable } from "../utils";

import { useEffect, useRef, useState } from "react";
import { listen } from "../listen";
import { useIsomorphicLayoutEffect } from "./tools";

/* eslint-disable prettier/prettier */
export function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "connection-state-change", listener: Nullable<(curState: ConnectionState, revState: ConnectionState, reason?: ConnectionDisconnectedReason) => void>): void
export function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "user-joined", listener: Nullable<(user: IAgoraRTCRemoteUser) => void>): void
export function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "user-left", listener: Nullable<(user: IAgoraRTCRemoteUser, reason: "Quit" | "ServerTimeOut" | "BecomeAudience") => void>): void
export function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "user-published", listener: Nullable<(user: IAgoraRTCRemoteUser, mediaType: "audio" | "video") => void>): void
export function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "user-unpublished", listener: Nullable<(user: IAgoraRTCRemoteUser, mediaType: "audio" | "video") => void>): void
export function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "user-info-updated", listener: Nullable<(uid: UID, msg: `${"mute" | "unmute"}-${"audio" | "video"}` | `${"enable" | "disable"}-local-video`) => void>): void
export function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "media-reconnect-start", listener: Nullable<(uid: UID) => void>): void
export function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "media-reconnect-end", listener: Nullable<(uid: UID) => void>): void
export function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "stream-type-changed", listener: Nullable<(uid: UID, streamType: RemoteStreamType) => void>): void
export function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "stream-fallback", listener: Nullable<(uid: UID, isFallbackOrRecover: "fallback" | "recover") => void>): void
export function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "channel-media-relay-state", listener: Nullable<(state: ChannelMediaRelayState, code: ChannelMediaRelayError) => void>): void
export function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "channel-media-relay-event", listener: Nullable<(event: ChannelMediaRelayEvent) => void>): void
export function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "volume-indicator", listener: Nullable<(result: { uid: UID; level: number }[]) => void>): void
export function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "crypt-error", listener: Nullable<() => void>): void
export function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "token-privilege-will-expire", listener: Nullable<() => void>): void
export function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "token-privilege-did-expire", listener: Nullable<() => void>): void
export function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "network-quality", listener: Nullable<(stats: NetworkQuality) => void>): void
export function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "live-streaming-error", listener: Nullable<(url: string, err: AgoraRTCError) => void>): void
export function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "live-streaming-warning", listener: Nullable<(url: string, err: AgoraRTCError) => void>): void
export function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "exception", listener: Nullable<(event: { code: number, msg: string, uid: UID }) => void>): void
export function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "is-using-cloud-proxy", listener: Nullable<(isUsingProxy: boolean) => void>): void
export function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "join-fallback-to-proxy", listener: Nullable<(proxyServer: string) => void>): void
export function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "published-user-list", listener: Nullable<(user: IAgoraRTCRemoteUser) => void>): void
export function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "content-inspect-connection-state-change", listener: Nullable<(preState: `${InspectState}`, newState: `${InspectState}`) => void>): void
export function useClientEvent(client: Nullable<IAgoraRTCClient>, event: "content-inspect-error", listener: Nullable<(error?: AgoraRTCError) => void>): void
export function useClientEvent(client: Nullable<IAgoraRTCClient>, event: string, listener: Nullable<Fn>) {
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
/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
export function useTrackEvent(track: Nullable<ILocalTrack>, event: "track-ended", listener: Nullable<() => void>): void;
export function useTrackEvent(track: Nullable<IBufferSourceAudioTrack>, event: "source-state-change", listener: Nullable<(currentState: AudioSourceState) => void>): void;
export function useTrackEvent(track: Nullable<ILocalVideoTrack>, event: "beauty-effect-overload", listener: Nullable<() => void>): void;
export function useTrackEvent(track: Nullable<ILocalVideoTrack>, event: "track-ended", listener: Nullable<() => void>): void;
export function useTrackEvent(track: Nullable<ILocalVideoTrack>, event: "video-element-visible-status", listener: Nullable<() => void>): void;
export function useTrackEvent(track: Nullable<IRemoteTrack>, event: "first-frame-decoded", listener: Nullable<() => void>): void;
export function useTrackEvent(track: Nullable<IRemoteVideoTrack>, event: "video-element-visible-status", listener: Nullable<(data?: CheckVideoVisibleResult) => void>): void;
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
/* eslint-disable prettier/prettier */

export function useConnectionState(client?: IAgoraRTCClient | null) {
  const [connectionState, setConnectionState] = useState(client ? client.connectionState : "DISCONNECTED");
  useClientEvent(client, "connection-state-change", setConnectionState);
  return connectionState;
}
