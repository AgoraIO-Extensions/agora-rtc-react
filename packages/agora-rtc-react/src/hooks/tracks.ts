import type {
  IAgoraRTCRemoteUser,
  ILocalAudioTrack,
  IRemoteAudioTrack,
  IRemoteVideoTrack,
} from "agora-rtc-sdk-ng";

import { useEffect, useState } from "react";
import { interval, joinDisposers } from "../utils";
import { listen } from "../listen";
import { useRTCClient } from "./context";
import { useIsConnected } from "./client";

/**
 * Auto-subscribe and get remote user video track.
 * Unsubscribe track on unmount.
 */
export function useRemoteUserTrack(
  user: IAgoraRTCRemoteUser | undefined,
  mediaType: "video",
): IRemoteVideoTrack | undefined;
/**
 * Auto-subscribe and get remote user audio track.
 * Unsubscribe track on unmount.
 */
export function useRemoteUserTrack(
  user: IAgoraRTCRemoteUser | undefined,
  mediaType: "audio",
): IRemoteAudioTrack | undefined;
export function useRemoteUserTrack(
  user: IAgoraRTCRemoteUser | undefined,
  mediaType: "video" | "audio",
): IRemoteVideoTrack | IRemoteAudioTrack | undefined {
  const client = useRTCClient();
  const trackName = mediaType === "audio" ? "audioTrack" : "videoTrack";
  const [track, setTrack] = useState(user && user[trackName]);
  const isConnected = useIsConnected();

  useEffect(() => {
    if (!user || !isConnected) return;

    let isUnmounted = false;

    const hasTrack = mediaType === "audio" ? "hasAudio" : "hasVideo";
    const uid = user.uid;

    setTrack(user[trackName]);

    const subscribe = async (user: IAgoraRTCRemoteUser, mediaType: "audio" | "video") => {
      try {
        await client.subscribe(user, mediaType);
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (isUnmounted) {
          if (user[hasTrack]) {
            client.unsubscribe(user, mediaType);
          }
          return;
        }
        setTrack(user[trackName]);
      } catch (error) {
        console.error(error);
      }
    };

    const unsubscribe = (user: IAgoraRTCRemoteUser, mediaType: "audio" | "video"): Promise<void> =>
      client.unsubscribe(user, mediaType).catch(console.error);

    if (!user[trackName] && user[hasTrack] && client.remoteUsers.includes(user)) {
      subscribe(user, mediaType);
    }

    return joinDisposers([
      () => {
        isUnmounted = true;
        if (user[trackName] && client.remoteUsers.includes(user)) {
          unsubscribe(user, mediaType);
        }
      },
      listen(client, "user-published", (pubUser, pubMediaType) => {
        if (pubUser.uid === uid && pubMediaType === mediaType) {
          subscribe(pubUser, pubMediaType);
        }
      }),
      listen(client, "user-unpublished", (pubUser, pubMediaType) => {
        if (pubUser.uid === uid && pubMediaType === mediaType && pubUser[trackName]) {
          unsubscribe(pubUser, mediaType);
          setTrack(undefined);
        }
      }),
    ]);
  }, [isConnected, client, user, mediaType, trackName]);

  return track;
}

/**
 * Reports volume of a videoTrack every second.
 *
 * @param audioTrack Local/Remote audio track. `volumeLevel` is 0 if undefined.
 * @returns The volume of the track, ranging from 0 to 1
 */
export function useVolumeLevel(audioTrack?: IRemoteAudioTrack | ILocalAudioTrack): number {
  const [volumeLevel, setVolumeLevel] = useState(0);

  useEffect(() => {
    if (audioTrack) {
      return interval(() => {
        setVolumeLevel(audioTrack.getVolumeLevel());
      }, 1000);
    }
  }, [audioTrack]);

  return volumeLevel;
}
