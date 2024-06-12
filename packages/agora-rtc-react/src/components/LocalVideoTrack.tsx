import type { ILocalVideoTrack, VideoPlayerConfig } from "agora-rtc-sdk-ng";
import type { HTMLProps } from "react";
import { useEffect, useState } from "react";

import { VideoTrackStyle, useMergedStyle } from "../assets/styles";
import { useAwaited } from "../hooks/tools";
import type { MaybePromiseOrNull } from "../misc/utils";

import { useAutoPlayVideoTrack } from "./TrackBoundary";

export interface LocalVideoTrackProps extends HTMLProps<HTMLDivElement> {
  readonly track?: MaybePromiseOrNull<ILocalVideoTrack>;

  readonly play?: boolean;

  readonly disabled?: boolean;

  readonly muted?: boolean;

  readonly videoPlayerConfig?: VideoPlayerConfig;
}

export function LocalVideoTrack({
  track: maybeTrack,
  play,
  disabled,
  muted,
  style,
  videoPlayerConfig,
  ...props
}: LocalVideoTrackProps) {
  const mergedStyle = useMergedStyle(VideoTrackStyle, style);
  const [div, setDiv] = useState<HTMLDivElement | null>(null);

  const track = useAwaited(maybeTrack);

  useAutoPlayVideoTrack(track, play, videoPlayerConfig, div);

  useEffect(() => {
    if (track && disabled != null) {
      track.setEnabled(!disabled).catch(console.warn);
    }
  }, [disabled, track]);

  useEffect(() => {
    if (track && muted != null) {
      track.setMuted(muted).catch(console.warn);
    }
  }, [muted, track]);

  return <div {...props} ref={setDiv} style={mergedStyle} />;
}
