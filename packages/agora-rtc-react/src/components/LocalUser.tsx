import "./User.css";

import type { IAgoraRTCClient, ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import type { HTMLProps, PropsWithChildren } from "react";

import AgoraRTC from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";
import { CameraVideoTrack } from "./CameraVideoTrack";
import { MicrophoneAudioTrack } from "./MicrophoneAudioTrack";
import { UserCover } from "./UserCover";
import { useSafePromise } from "../hooks";

export interface LocalUserProps extends HTMLProps<HTMLDivElement> {
  /**
   * The client to publish local tracks to.
   */
  readonly client?: IAgoraRTCClient;
  /**
   * Whether to turn on the local user's microphone. Default false.
   */
  readonly micOn?: boolean;
  /**
   * Whether to turn on the local user's camera. Default false.
   */
  readonly cameraOn?: boolean;
  /**
   * Whether to play the local user's audio track. Default false.
   */
  readonly playAudio?: boolean;
  /**
   * Whether to play the local user's video track. Default false.
   */
  readonly playVideo?: boolean;
  /**
   * Device ID, which can be retrieved by calling `getDevices()`.
   */
  readonly micDeviceId?: string;
  /**
   * Device ID, which can be retrieved by calling `getDevices()`.
   */
  readonly cameraDeviceId?: string;
  /**
   * The volume. The value ranges from 0 (mute) to 1000 (maximum). A value of 100 is the current volume.
   */
  readonly volume?: number;
  /**
   * Whether to darken the video canvas when the mouse hovers over it. Default false.
   */
  readonly darkenOnHover?: boolean;
  /**
   * Render cover image if playVideo is off.
   */
  readonly cover?: string;
}

/**
 * Publish and play local user video and audio track.
 * High-level Component for rendering and publishing a local user video and audio track.
 */
export function LocalUser({
  client,
  micOn,
  cameraOn,
  playAudio,
  playVideo,
  micDeviceId,
  cameraDeviceId,
  volume,
  darkenOnHover,
  cover,
  children,
  className = "",
  ...props
}: PropsWithChildren<LocalUserProps>) {
  const sp = useSafePromise();
  const [audioTrack, setAudioTrack] = useState<IMicrophoneAudioTrack | null>(null);
  const [videoTrack, setVideoTrack] = useState<ICameraVideoTrack | null>(null);

  useEffect(() => {
    if (micOn && !audioTrack) {
      sp(AgoraRTC.createMicrophoneAudioTrack({ ANS: true, AEC: true })).then(setAudioTrack);
    }
  }, [audioTrack, micOn, sp]);

  useEffect(() => {
    if (cameraOn && !videoTrack) {
      sp(AgoraRTC.createCameraVideoTrack()).then(setVideoTrack);
    }
  }, [cameraOn, sp, videoTrack]);

  useEffect(() => {
    if (client && audioTrack) {
      client.publish(audioTrack);
    }
  }, [audioTrack, client]);

  useEffect(() => {
    if (client && videoTrack) {
      client.publish(videoTrack);
    }
  }, [videoTrack, client]);

  return (
    <div className={`arr-user ${className} ${darkenOnHover ? "darken-on-hover" : ""}`} {...props}>
      <CameraVideoTrack
        className="arr-user-video"
        track={videoTrack}
        play={playVideo}
        deviceId={cameraDeviceId}
        disabled={!cameraOn}
      />
      <MicrophoneAudioTrack
        track={audioTrack}
        play={playAudio}
        deviceId={micDeviceId}
        disabled={!micOn}
      />
      {cover && !playVideo && <UserCover className="arr-user-cover" cover={cover} />}
      <div className="arr-user-body">{children}</div>
    </div>
  );
}
