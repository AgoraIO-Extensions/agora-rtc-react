import type { ILocalAudioTrack } from "agora-rtc-sdk-ng";
import type { ReactNode } from "react";
import { useEffect } from "react";

import { useAwaited } from "../hooks/tools";
import type { MaybePromiseOrNull } from "../misc/utils";

import { useAutoPlayAudioTrack } from "./TrackBoundary";

export interface LocalAudioTrackProps {
  readonly track?: MaybePromiseOrNull<ILocalAudioTrack>;

  readonly play?: boolean;

  readonly volume?: number;

  readonly disabled?: boolean;

  readonly muted?: boolean;

  readonly children?: ReactNode;
}

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
