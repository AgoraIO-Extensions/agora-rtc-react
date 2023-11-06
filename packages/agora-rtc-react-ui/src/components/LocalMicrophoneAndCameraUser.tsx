import type { ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-react";
import {
  FloatBoxStyle,
  VideoTrackWrapperStyle,
  useMergedStyle,
} from "agora-rtc-react/src/assets/styles";
import { UserCover } from "agora-rtc-react/src/components/UserCover";
import type { MaybePromiseOrNull } from "agora-rtc-react/src/misc/utils";
import type { HTMLProps, ReactNode } from "react";

import { CameraVideoTrack } from "./CameraVideoTrack";
import { MicrophoneAudioTrack } from "./MicrophoneAudioTrack";

export interface LocalMicrophoneAndCameraUserProps extends HTMLProps<HTMLDivElement> {
  /**
   * Whether to turn on the local user's microphone. Default false.
   */
  readonly micOn?: boolean;
  /**
   * Whether to turn on the local user's camera. Default false.
   */
  readonly cameraOn?: boolean;
  /**
   * A microphone audio track which can be created by `createMicrophoneAudioTrack()`.
   */
  readonly audioTrack?: MaybePromiseOrNull<IMicrophoneAudioTrack>;
  /**
   * A camera video track which can be created by `createCameraVideoTrack()`.
   */
  readonly videoTrack?: MaybePromiseOrNull<ICameraVideoTrack>;
  /**
   * Whether to play the local user's audio track. Default follows `micOn`.
   */
  readonly playAudio?: boolean;
  /**
   * Whether to play the local user's video track. Default follows `cameraOn`.
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
   * Render cover image if playVideo is off.
   */
  readonly cover?: string;
  /**
   * Children is rendered on top of the video canvas.
   */
  readonly children?: ReactNode;
}

/**
 * Play/Stop local user camera and microphone track.
 */
export function LocalMicrophoneAndCameraUser({
  micOn,
  cameraOn,
  audioTrack,
  videoTrack,
  playAudio = false,
  playVideo,
  micDeviceId,
  cameraDeviceId,
  volume,
  cover,
  children,
  style,
  ...props
}: LocalMicrophoneAndCameraUserProps) {
  const mergedStyle = useMergedStyle(VideoTrackWrapperStyle, style);
  playVideo = playVideo ?? !!cameraOn;
  playAudio = playAudio ?? !!micOn;
  return (
    <div {...props} style={mergedStyle}>
      <CameraVideoTrack
        deviceId={cameraDeviceId}
        disabled={!cameraOn}
        play={playVideo}
        track={videoTrack}
      />
      <MicrophoneAudioTrack
        deviceId={micDeviceId}
        disabled={!micOn}
        play={playAudio}
        track={audioTrack}
        volume={volume}
      />
      {cover && !cameraOn && <UserCover cover={cover} />}
      <div style={FloatBoxStyle}>{children}</div>
    </div>
  );
}
