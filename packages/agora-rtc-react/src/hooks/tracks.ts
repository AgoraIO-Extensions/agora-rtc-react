import type {
  MicrophoneAudioTrackInitConfig,
  CameraVideoTrackInitConfig,
  IAgoraRTCClient,
  UID,
  IAgoraRTCRemoteUser,
  IRemoteAudioTrack,
  IRemoteVideoTrack,
} from "agora-rtc-sdk-ng";

import AgoraRTC from "agora-rtc-sdk-ng";
import { useState, useMemo, useEffect } from "react";
import { listen } from "../listen";
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
    if (user) {
      const hasTrack = mediaType === "audio" ? "hasAudio" : "hasVideo";
      let isUnmounted = false;
      setTrack(user[trackName]);
      if (!user[trackName]) {
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
        if (user[hasTrack]) {
          subscribe(user, mediaType);
        } else {
          const uid = user.uid;
          return listen(client, "user-published", (pubUser, pubMediaType) => {
            if (pubUser.uid === uid && pubMediaType === mediaType) {
              subscribe(pubUser, pubMediaType);
            }
          });
        }
      }
      return () => {
        isUnmounted = true;
        if (user[trackName]) {
          client.unsubscribe(user, mediaType).catch(console.error);
        }
      };
    }
  }, [client, user, mediaType, trackName]);

  return track;
}

/**
 * Reports volume of a remote speaking user every two seconds via listening to "volume-indicator".
 *
 * It also enables `enableAudioVolumeIndicator`.
 *
 * @param uid The ID of the speaking user. `volumeLevel` is 0 if undefined.
 * @returns The volume of the user, ranging from 0 to 100
 */
export function useVolumeLevel(uid?: UID): number {
  const [volumeLevel, setVolumeLevel] = useState(0);

  const client = useRTCClient(true);

  useEffect(() => {
    if (uid != null && client) {
      client.enableAudioVolumeIndicator();
      return listen(client, "volume-indicator", results => {
        for (const volume of results) {
          if (volume.uid === uid) {
            setVolumeLevel(volume.level);
            break;
          }
        }
      });
    }
  }, [uid, client]);

  return volumeLevel;
}
