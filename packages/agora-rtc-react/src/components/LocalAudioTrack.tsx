import type { ILocalAudioTrack } from "agora-rtc-sdk-ng";
import type { ReactNode } from "react";
import { useEffect } from "react";

import { useAwaited } from "../hooks";
import type { MaybePromiseOrNull } from "../utils";

import { useAutoPlayAudioTrack } from "./TrackBoundary";

export interface LocalAudioTrackProps {
  /**
   * A local audio track which can be created by `createMicrophoneAudioTrack()`.
   */
  readonly track?: MaybePromiseOrNull<ILocalAudioTrack>;
  /**
   * Whether to play the track.
   */
  readonly play?: boolean;
  /**
   * The volume. The value ranges from 0 (mute) to 100 (maximum). A value of 100 is the current volume.
   */
  readonly volume?: number;
  /**
   * Enable or disable the track.
   *
   * If a track is disabled, the SDK stops playing and publishing the track.
   */
  readonly disabled?: boolean;
  /**
   * Sends or stops sending the media data of the track.
   *
   * - Setting `muted` does not stop capturing audio and takes shorter time to take effect than `disabled`. For details, see [What are the differences between setEnabled and setMuted?](https://docs.agora.io/en/Interactive%20Broadcast/faq/differences_between_setenabled_and_setmuted).
   * - Do not use `disabled` and `muted` together.
   */
  readonly muted?: boolean;

  readonly children?: ReactNode;
}

/**
 * A component which plays a local audio track.
 */
export function LocalAudioTrack({
  track: maybeTrack,
  play = false,
  volume,
  disabled,
  muted,
  children,
}: LocalAudioTrackProps) {
  const track = useAwaited(maybeTrack);

  useAutoPlayAudioTrack(track, play);

  useEffect(() => {
    if (track && volume != null) {
      track.setVolume(volume);
    }
  }, [track, volume]);

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

  return children ? <>{children}</> : null;
}
