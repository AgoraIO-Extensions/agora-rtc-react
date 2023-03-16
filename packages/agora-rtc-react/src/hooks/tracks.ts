import type {
  MicrophoneAudioTrackInitConfig,
  CameraVideoTrackInitConfig,
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  IRemoteAudioTrack,
  IRemoteVideoTrack,
  ILocalAudioTrack,
} from "agora-rtc-sdk-ng";

import AgoraRTC from "agora-rtc-sdk-ng";
import { useState, useMemo, useEffect } from "react";
import { listen } from "../listen";
import { interval, joinDisposers } from "../utils";
import { useConnectionState } from "./client";
import { useRTCClient } from "./context";
import { useAwaited } from "./tools";

/**
 * Create and publish microphone audio track.
 *
 * If `client` is null, it will not publish the track.
 */
export function useMicrophone(
  client: IAgoraRTCClient | null,
  defaultMicOn: boolean,
  config?: MicrophoneAudioTrackInitConfig,
) {
  const [micOn, setMic] = useState(defaultMicOn);
  const pAudioTrack = useMemo(
    // TODO: config change?
    () => (micOn ? AgoraRTC.createMicrophoneAudioTrack(config) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [micOn],
  );
  const audioTrack = useAwaited(pAudioTrack);
  const connectionState = useConnectionState(client);
  useEffect(() => {
    if (client && audioTrack && connectionState === "CONNECTED") {
      client.publish(audioTrack).catch(console.error);
      return () => void client.unpublish(audioTrack);
    }
  }, [audioTrack, client, connectionState]);
  return { audioTrack, micOn, setMic };
}

/**
 * Create and publish camera video track.
 *
 * If `client` is null, it will not publish the track.
 */
export function useCamera(
  client: IAgoraRTCClient | null,
  defaultCameraOn: boolean,
  config?: CameraVideoTrackInitConfig,
) {
  const [cameraOn, setCamera] = useState(defaultCameraOn);
  const pVideoTrack = useMemo(
    // TODO: config change?
    () => (cameraOn ? AgoraRTC.createCameraVideoTrack(config) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cameraOn],
  );
  const videoTrack = useAwaited(pVideoTrack);
  const connectionState = useConnectionState(client);
  useEffect(() => {
    if (client && videoTrack && connectionState === "CONNECTED") {
      client.publish(videoTrack).catch(console.error);
      return () => void client.unpublish(videoTrack);
    }
  }, [videoTrack, client, connectionState]);
  return { videoTrack, cameraOn, setCamera };
}

/**
 * Subscribe and get remote user video track.
 * Unsubscribe track on unmount.
 */
export function useRemoteUserTrack(
  user: IAgoraRTCRemoteUser | undefined,
  mediaType: "video",
): IRemoteVideoTrack | undefined;
/**
 * Subscribe and get remote user audio track.
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

  useEffect(() => {
    if (!user) return;

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

    const unsubscribe = (user: IAgoraRTCRemoteUser, mediaType: "audio" | "video") =>
      client.unsubscribe(user, mediaType).catch(console.error);

    if (!user[trackName] && user[hasTrack]) {
      subscribe(user, mediaType);
    }

    return joinDisposers([
      () => {
        isUnmounted = true;
        if (user[trackName]) {
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
        }
      }),
    ]);
  }, [client, user, mediaType, trackName]);

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
