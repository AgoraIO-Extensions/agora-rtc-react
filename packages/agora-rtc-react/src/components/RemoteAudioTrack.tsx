import type { IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import type { ReactNode } from "react";
import { useEffect } from "react";

import type { Nullable } from "../misc/utils";

import { useAutoPlayAudioTrack } from "./TrackBoundary";

export interface RemoteAudioTrackProps {
  readonly track?: Nullable<IRemoteAudioTrack>;

  readonly play?: boolean;

  readonly playbackDeviceId?: string;

  readonly volume?: number;

  readonly children?: ReactNode;
}

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
