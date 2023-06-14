import type { ILocalAudioTrack, ILocalVideoTrack } from "agora-rtc-sdk-ng";
import type { HTMLProps, ReactNode } from "react";

import type { MaybePromiseOrNull } from "../utils";

import { LocalAudioTrack } from "./LocalAudioTrack";
import { LocalVideoTrack } from "./LocalVideoTrack";
import { UserCover } from "./UserCover";
import { FloatBoxStyle, VideoTrackWrapperStyle, useMergedStyle } from "./styles";

export interface LocalUserProps extends HTMLProps<HTMLDivElement> {
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
  readonly audioTrack?: MaybePromiseOrNull<ILocalAudioTrack>;
  /**
   * A camera video track which can be created by `createCameraVideoTrack()`.
   */
  readonly videoTrack?: MaybePromiseOrNull<ILocalVideoTrack>;
  /**
   * Whether to play the local user's audio track. Default follows `micOn`.
   */
  readonly playAudio?: boolean;
  /**
   * Whether to play the local user's video track. Default follows `cameraOn`.
   */
  readonly playVideo?: boolean;
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
export function LocalUser({
  micOn,
  cameraOn,
  audioTrack,
  videoTrack,
  playAudio,
  playVideo,
  volume,
  cover,
  children,
  style,
  ...props
}: LocalUserProps) {
  const mergedStyle = useMergedStyle(VideoTrackWrapperStyle, style);
  playVideo = playVideo ?? !!cameraOn;
  playAudio = playAudio ?? !!micOn;
  return (
    <div {...props} style={mergedStyle}>
      <LocalVideoTrack disabled={!cameraOn} play={playVideo} track={videoTrack} />
      <LocalAudioTrack disabled={!micOn} play={playAudio} track={audioTrack} volume={volume} />
      {cover && !cameraOn && <UserCover cover={cover} />}
      <div style={FloatBoxStyle}>{children}</div>
    </div>
  );
}
