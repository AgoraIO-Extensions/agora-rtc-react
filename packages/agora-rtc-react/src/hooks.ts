import type {
  IAgoraRTCClient,
  IBufferSourceAudioTrack,
  ILocalAudioTrack,
  ILocalTrack,
  ILocalVideoTrack,
  IRemoteAudioTrack,
  IRemoteTrack,
  IRemoteVideoTrack,
} from "agora-rtc-sdk-ng";
import type {
  BufferSourceAudioTrackEventMap,
  ClientEventMap,
  LocalAudioTrackEventMap,
  LocalVideoTrackEventMap,
  RemoteAudioTrackEventMap,
  RemoteVideoTrackEventMap,
} from "./listen";
import type { Fn } from "./utils";
import { useIsomorphicLayoutEffect } from "./utils";

import { useEffect, useRef } from "react";
import { listen } from "./listen";

export type Nullable<T> = T | null | undefined;

export function useClientEvent<E extends keyof ClientEventMap>(
  client: Nullable<IAgoraRTCClient>,
  event: E,
  callback: Nullable<ClientEventMap[E]>,
): void;
export function useClientEvent(client: any, event: any, callback: Fn): void {
  const callbackRef = useRef(callback);

  useIsomorphicLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (client) {
      return listen(client, event, (...args: unknown[]) => {
        if (callbackRef.current) {
          callbackRef.current(...args);
        }
      });
    }
  }, [event, client]);
}

export function useTrackEvent<E extends keyof LocalAudioTrackEventMap>(
  track: Nullable<ILocalAudioTrack>,
  event: E,
  callback: Nullable<LocalAudioTrackEventMap[E]>,
): void;
export function useTrackEvent<E extends keyof BufferSourceAudioTrackEventMap>(
  track: Nullable<IBufferSourceAudioTrack>,
  event: E,
  callback: Nullable<BufferSourceAudioTrackEventMap[E]>,
): void;
export function useTrackEvent<E extends keyof LocalVideoTrackEventMap>(
  track: Nullable<ILocalVideoTrack>,
  event: E,
  callback: Nullable<LocalVideoTrackEventMap[E]>,
): void;
export function useTrackEvent<E extends keyof RemoteAudioTrackEventMap>(
  track: Nullable<IRemoteAudioTrack>,
  event: E,
  callback: Nullable<RemoteAudioTrackEventMap[E]>,
): void;
export function useTrackEvent<E extends keyof RemoteVideoTrackEventMap>(
  track: Nullable<IRemoteVideoTrack>,
  event: E,
  callback: Nullable<RemoteVideoTrackEventMap[E]>,
): void;
export function useTrackEvent(track: any, event: any, callback: Nullable<Fn>) {
  const callbackRef = useRef(callback);

  useIsomorphicLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (track) {
      return listen(track, event, (...args: unknown[]) => {
        if (callbackRef.current) {
          callbackRef.current(...args);
        }
      });
    }
  }, [event, track]);
}

export function useCloseLocalTrackOnUnmount(track: Nullable<ILocalTrack>) {
  useEffect(() => {
    if (track) {
      return () => {
        track.stop();
        track.close();
      };
    }
  }, [track]);
}

export function useStopRemoteTrackOnUnmount(track: Nullable<IRemoteTrack>) {
  useEffect(() => {
    if (track) {
      return () => {
        track.stop();
      };
    }
  }, [track]);
}
