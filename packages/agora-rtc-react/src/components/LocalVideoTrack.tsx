import type { ILocalVideoTrack } from "agora-rtc-sdk-ng";
import type { HTMLProps } from "react";
import type { MaybePromiseOrNull } from "../utils";

import { useEffect, useState } from "react";
import { useAwaited } from "../hooks";
import { useMergedStyle, VideoTrackStyle } from "./styles";
import { useAutoPlayVideoTrack } from "./TrackBoundary";

export interface LocalVideoTrackProps extends HTMLProps<HTMLDivElement> {
  /**
   * A local video track which can be created by `createCameraVideoTrack()` or `createScreenVideoTrack()`.
   */
  readonly track?: MaybePromiseOrNull<ILocalVideoTrack>;
  /**
   * Whether to play the track.
   */
  readonly play?: boolean;
  /**
   * Enable or disable the track.
   *
   * If a track is disabled, the SDK stops playing and publishing the track.
   */
  readonly disabled?: boolean;
  /**
   * Sends or stops sending the media data of the track.
   *
   * - Setting `muted` does not stop capturing video and takes shorter time to take effect than `disabled`. For details, see [What are the differences between setEnabled and setMuted?](https://docs.agora.io/en/Interactive%20Broadcast/faq/differences_between_setenabled_and_setmuted).
   * - Do not use `disabled` and `muted` together.
   */
  readonly muted?: boolean;
}

/**
 * A component which renders a local video track.
 */
export function LocalVideoTrack({
  track: maybeTrack,
  play,
  disabled,
  muted,
  style,
  ...props
}: LocalVideoTrackProps) {
  const mergedStyle = useMergedStyle(VideoTrackStyle, style);
  const [div, setDiv] = useState<HTMLDivElement | null>(null);

  const track = useAwaited(maybeTrack);

  useAutoPlayVideoTrack(track, play, div);

  useEffect(() => {
    if (track && disabled != null) {
      track.setEnabled(!disabled);
    }
  }, [disabled, track]);

  useEffect(() => {
    if (track && muted != null) {
      track.setMuted(muted);
    }
  }, [muted, track]);

  return <div {...props} ref={setDiv} style={mergedStyle} />;
}
