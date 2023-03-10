import type { ILocalAudioTrack } from "agora-rtc-sdk-ng";
import type { MaybePromiseOrNull } from "../utils";

import { useEffect } from "react";
import { useReleaseTrackOnUmount } from "../hooks";
import { useAwaited } from "../utils";

export interface LocalAudioTrackProps {
  /**
   * A local audio track which can be created by `createMicrophoneAudioTrack()`.
   */
  readonly track?: MaybePromiseOrNull<ILocalAudioTrack>;
  /**
   * Whether to play the track.
   */
  readonly play?: boolean;
  readonly publish?: boolean;
  /**
   * The volume. The value ranges from 0 (mute) to 100 (maximum). A value of 100 is the current volume.
   */
  readonly volume?: number;
}

export function LocalAudioTrack({
  track: maybeTrack,
  play,
  publish,
  volume,
}: LocalAudioTrackProps) {
  const track = useAwaited(maybeTrack);
  useReleaseTrackOnUmount(track);

  useEffect(() => {
    if (track) {
      play ? track.play() : track.stop();
    }
  }, [play, track]);

  useEffect(() => {
    console.log("TODO: publish", { track, publish });
  }, [publish, track]);

  useEffect(() => {
    if (track && volume != null) {
      track.setVolume(volume);
    }
  }, [track, volume]);

  return null;
}
