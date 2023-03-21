import type { IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import type { HTMLProps } from "react";
import type { Nullable } from "../utils";

import { useEffect, useState } from "react";
import { useAutoStopTrack } from "../hooks/internal";

export interface RemoteVideoTrackProps extends HTMLProps<HTMLDivElement> {
  /**
   * A remote video track.
   */
  readonly track?: Nullable<IRemoteVideoTrack>;
  /**
   * Whether to play the track.
   */
  readonly play?: boolean;
}

/**
 * A component which renders a remote video track.
 */
export function RemoteVideoTrack({ track, play, ...props }: RemoteVideoTrackProps) {
  const [div, setDiv] = useState<HTMLDivElement | null>(null);

  useAutoStopTrack(track);

  useEffect(() => {
    if (div && track && play) {
      track.play(div);
    } else if (track && !play && track.isPlaying) {
      track.stop();
    }
  }, [div, play, track]);

  return <div ref={setDiv} {...props} />;
}
