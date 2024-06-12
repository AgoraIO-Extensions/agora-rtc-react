import type { IAgoraRTCRemoteUser, VideoPlayerConfig } from "agora-rtc-sdk-ng";
import type { HTMLProps, ReactNode } from "react";

import { FloatBoxStyle, VideoTrackWrapperStyle, useMergedStyle } from "../assets/styles";
import { useRemoteUserTrack } from "../hooks";

import { RemoteAudioTrack } from "./RemoteAudioTrack";
import { RemoteVideoTrack } from "./RemoteVideoTrack";
import { UserCover } from "./UserCover";

export interface RemoteUserProps extends HTMLProps<HTMLDivElement> {
  readonly user?: IAgoraRTCRemoteUser;

  readonly playVideo?: boolean;

  readonly playAudio?: boolean;

  readonly playbackDeviceId?: string;

  readonly volume?: number;

  readonly cover?: string | (() => ReactNode);

  readonly children?: ReactNode;

  readonly videoPlayerConfig?: VideoPlayerConfig;
}

export function RemoteUser({
  user,
  playVideo,
  playAudio,
  playbackDeviceId,
  volume,
  cover,
  style,
  children,
  videoPlayerConfig,
  ...props
}: RemoteUserProps) {
  const mergedStyle = useMergedStyle(VideoTrackWrapperStyle, style);
  const { track: videoTrack } = useRemoteUserTrack(user, "video");
  const { track: audioTrack } = useRemoteUserTrack(user, "audio");

  playVideo = playVideo ?? user?.hasVideo;
  playAudio = playAudio ?? user?.hasAudio;

  return (
    <div {...props} style={mergedStyle}>
      <RemoteVideoTrack play={playVideo} track={videoTrack} videoPlayerConfig={videoPlayerConfig} />
      <RemoteAudioTrack
        play={playAudio}
        playbackDeviceId={playbackDeviceId}
        track={audioTrack}
        volume={volume}
      />
      {cover && !playVideo && <UserCover cover={cover} />}
      <div style={FloatBoxStyle}>{children}</div>
    </div>
  );
}
