import type { IRemoteVideoTrack, VideoPlayerConfig } from "agora-rtc-sdk-ng";
import type { HTMLProps } from "react";
import { useState } from "react";

import { VideoTrackStyle, useMergedStyle } from "../assets/styles";
import type { Nullable } from "../misc/utils";

import { useAutoPlayVideoTrack } from "./TrackBoundary";

export interface RemoteVideoTrackProps extends HTMLProps<HTMLDivElement> {
  readonly track?: Nullable<IRemoteVideoTrack>;

  readonly play?: boolean;

  readonly videoPlayerConfig?: VideoPlayerConfig;
}

export function RemoteVideoTrack({
  track,
  play,
  style,
  videoPlayerConfig,
  ...props
}: RemoteVideoTrackProps) {
  const mergedStyle = useMergedStyle(VideoTrackStyle, style);
  const [div, setDiv] = useState<HTMLDivElement | null>(null);

  useAutoPlayVideoTrack(track, play, videoPlayerConfig, div);

  return <div {...props} ref={setDiv} style={mergedStyle} />;
}
