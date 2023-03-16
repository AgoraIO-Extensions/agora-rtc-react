import type { ILocalAudioTrack } from "agora-rtc-sdk-ng";
import type { MaybePromiseOrNull } from "../utils";

import { useEffect } from "react";
import { useAwaited } from "../hooks";
import { useStopTrackOnUmount } from "../hooks/internal";

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
}

export function LocalAudioTrack({ track: maybeTrack, play, volume }: LocalAudioTrackProps) {
  const track = useAwaited(maybeTrack);
  useStopTrackOnUmount(track);

  useEffect(() => {
    if (track) {
      play ? track.play() : track.stop();
    }
  }, [play, track]);

  useEffect(() => {
    if (track && volume != null) {
      track.setVolume(volume);
    }
  }, [track, volume]);

  return null;
}
