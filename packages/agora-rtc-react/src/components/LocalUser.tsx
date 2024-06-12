import type { ILocalAudioTrack, ILocalVideoTrack } from "agora-rtc-sdk-ng";
import type { HTMLProps, ReactNode } from "react";

import { FloatBoxStyle, VideoTrackWrapperStyle, useMergedStyle } from "../assets/styles";
import type { MaybePromiseOrNull } from "../misc/utils";

import { LocalAudioTrack } from "./LocalAudioTrack";
import { LocalVideoTrack } from "./LocalVideoTrack";
import { UserCover } from "./UserCover";

export interface LocalUserProps extends HTMLProps<HTMLDivElement> {
  readonly micOn?: boolean;

  readonly cameraOn?: boolean;

  readonly audioTrack?: MaybePromiseOrNull<ILocalAudioTrack>;

  readonly videoTrack?: MaybePromiseOrNull<ILocalVideoTrack>;

  readonly playAudio?: boolean;

  readonly playVideo?: boolean;

  readonly volume?: number;

  readonly cover?: string;

  readonly children?: ReactNode;
}

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
