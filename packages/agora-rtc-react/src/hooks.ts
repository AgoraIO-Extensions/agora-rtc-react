import type {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  IBufferSourceAudioTrack,
  ILocalAudioTrack,
  ILocalTrack,
  ILocalVideoTrack,
  IRemoteAudioTrack,
  IRemoteVideoTrack,
  ITrack,
} from "agora-rtc-sdk-ng";
import type {
  BufferSourceAudioTrackEventMap,
  ClientEventMap,
  Listener,
  LocalAudioTrackEventMap,
  LocalVideoTrackEventMap,
  RemoteAudioTrackEventMap,
  RemoteVideoTrackEventMap,
} from "./listen";
import type { Fn, Nullable } from "./utils";

import { useEffect, useRef, useState } from "react";
import { listen } from "./listen";
import { joinDisposers, useIsomorphicLayoutEffect } from "./utils";

export function useClientEvent<E extends keyof ClientEventMap>(
  client: Nullable<IAgoraRTCClient>,
  event: E,
  listener: Nullable<Listener<ClientEventMap[E]>>,
): void {
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

export function useTrackEvent<E extends keyof LocalAudioTrackEventMap>(
  track: Nullable<ILocalAudioTrack>,
  event: E,
  listener: Nullable<Listener<LocalAudioTrackEventMap[E]>>,
): void;
export function useTrackEvent<E extends keyof BufferSourceAudioTrackEventMap>(
  track: Nullable<IBufferSourceAudioTrack>,
  event: E,
  listener: Nullable<Listener<BufferSourceAudioTrackEventMap[E]>>,
): void;
export function useTrackEvent<E extends keyof LocalVideoTrackEventMap>(
  track: Nullable<ILocalVideoTrack>,
  event: E,
  listener: Nullable<Listener<LocalVideoTrackEventMap[E]>>,
): void;
export function useTrackEvent<E extends keyof RemoteAudioTrackEventMap>(
  track: Nullable<IRemoteAudioTrack>,
  event: E,
  listener: Nullable<Listener<RemoteAudioTrackEventMap[E]>>,
): void;
export function useTrackEvent<E extends keyof RemoteVideoTrackEventMap>(
  track: Nullable<IRemoteVideoTrack>,
  event: E,
  listener: Nullable<Listener<RemoteVideoTrackEventMap[E]>>,
): void;
export function useTrackEvent(track: any, event: any, listener: Nullable<Fn>) {
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

/**
 * Release local or remote track when the component unmounts.
 */
export function useReleaseTrackOnUmount(track: Nullable<ITrack>) {
  useEffect(() => {
    if (track) {
      return () => {
        track.stop();
        if ((track as ILocalTrack).close) {
          (track as ILocalTrack).close();
        }
      };
    }
  }, [track]);
}

/**
 * Get interactive remote users in react components.
 */
export function useRemoteUsers(client: IAgoraRTCClient): readonly IAgoraRTCRemoteUser[] {
  const [users, setUsers] = useState(client.remoteUsers);

  useEffect(() => {
    // .slice(): make sure to update the array reference
    const update = () => setUsers(client.remoteUsers.slice());
    return joinDisposers([
      listen(client, "user-joined", update),
      listen(client, "user-left", update),
    ]);
  }, [client]);

  return users;
}
