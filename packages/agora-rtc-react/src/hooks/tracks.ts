import type {
  MicrophoneAudioTrackInitConfig,
  CameraVideoTrackInitConfig,
  IAgoraRTCClient,
  UID,
} from "agora-rtc-sdk-ng";

import AgoraRTC from "agora-rtc-sdk-ng";
import { useState, useMemo, useEffect } from "react";
import { listen } from "../listen";
import { useRTCClient } from "./context";
import { useConnectionState } from "./events";
import { useAwaited } from "./tools";

export function useMicrophone(
  client: IAgoraRTCClient,
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
    if (audioTrack && connectionState === "CONNECTED") {
      client.publish(audioTrack).catch(console.error);
      return () => void client.unpublish(audioTrack);
    }
  }, [audioTrack, client, connectionState]);
  return { audioTrack, micOn, setMic };
}

export function useCamera(
  client: IAgoraRTCClient,
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
    if (videoTrack && connectionState === "CONNECTED") {
      client.publish(videoTrack).catch(console.error);
      return () => void client.unpublish(videoTrack);
    }
  }, [videoTrack, client, connectionState]);
  return { videoTrack, cameraOn, setCamera };
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
