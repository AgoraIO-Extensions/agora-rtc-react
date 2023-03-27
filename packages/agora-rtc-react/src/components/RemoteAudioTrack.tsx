import type { IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import type { ReactNode } from "react";
import type { Nullable } from "../utils";

import { useEffect } from "react";
import { useAutoPlayAudioTrack } from "./TrackBoundary";

export interface RemoteAudioTrackProps {
  /**
   * A remote audio track.
   */
  readonly track?: Nullable<IRemoteAudioTrack>;
  /**
   * Whether to play the track.
   */
  readonly play?: boolean;
  /**
   * Device ID, which can be retrieved by calling `getPlaybackDevices`.
   *
   * Changes of the ID will invoke `setPlaybackDevice` which sets the audio playback device, for example, the speaker.
   *
   * > `setPlaybackDevice` supports Chrome on desktop devices only. Other browsers throw a `NOT_SUPPORTED` error when calling the method.
   */
  readonly playbackDeviceId?: string;
  /**
   * The volume. The value ranges from 0 (mute) to 100 (maximum). A value of 100 is the current volume.
   */
  readonly volume?: number;

  readonly children?: ReactNode;
}

/**
 * A component which plays a remote audio track.
 */
export function RemoteAudioTrack({
  track,
  play = false,
  playbackDeviceId,
  volume,
  children,
}: RemoteAudioTrackProps) {
  useAutoPlayAudioTrack(track, play);

  useEffect(() => {
    if (track && playbackDeviceId != null) {
      track.setPlaybackDevice(playbackDeviceId).catch(console.warn);
    }
  }, [track, playbackDeviceId]);

  useEffect(() => {
    if (track && volume != null) {
      track.setVolume(volume);
    }
  }, [track, volume]);

  return children ? <>{children}</> : null;
}
