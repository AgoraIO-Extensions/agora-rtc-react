import type {
  MicrophoneAudioTrackInitConfig,
  CameraVideoTrackInitConfig,
  IAgoraRTCClient,
} from "agora-rtc-sdk-ng";

import AgoraRTC from "agora-rtc-sdk-ng";
import { useState, useMemo, useEffect } from "react";
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
