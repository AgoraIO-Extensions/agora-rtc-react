import "./User.css";

import type { ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import type { HTMLProps, ReactNode } from "react";
import type { MaybePromiseOrNull } from "../utils";

import { CameraVideoTrack } from "./CameraVideoTrack";
import { MicrophoneAudioTrack } from "./MicrophoneAudioTrack";
import { UserCover } from "./UserCover";

export interface LocalMicrophoneAndCameraUserProps extends HTMLProps<HTMLDivElement> {
  /**
   * Whether to turn on the local user's microphone. Default false.
   */
  readonly micDisabled?: boolean;
  /**
   * Whether to turn on the local user's camera. Default false.
   */
  readonly cameraDisabled?: boolean;
  /**
   * A microphone audio track which can be created by `createMicrophoneAudioTrack()`.
   */
  readonly audioTrack?: MaybePromiseOrNull<IMicrophoneAudioTrack>;
  /**
   * A camera video track which can be created by `createCameraVideoTrack()`.
   */
  readonly videoTrack?: MaybePromiseOrNull<ICameraVideoTrack>;
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

  readonly children?: ReactNode;
}

/**
 * Publish and play local user video and audio track.
 * High-level Component for rendering and publishing a local user video and audio track.
 */
export function LocalMicrophoneAndCameraUser({
  micDisabled,
  cameraDisabled,
  audioTrack,
  videoTrack,
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
}: LocalMicrophoneAndCameraUserProps) {
  return (
    <div className={`arr-user ${className} ${darkenOnHover ? "darken-on-hover" : ""}`} {...props}>
      <CameraVideoTrack
        className="arr-user-video"
        track={videoTrack}
        play={playVideo}
        deviceId={cameraDeviceId}
        disabled={cameraDisabled}
      />
      <MicrophoneAudioTrack
        track={audioTrack}
        play={playAudio}
        deviceId={micDeviceId}
        disabled={micDisabled}
      />
      {cover && !playVideo && <UserCover className="arr-user-cover" cover={cover} />}
      <div className="arr-user-body">{children}</div>
    </div>
  );
}
