import type { IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import type { HTMLProps } from "react";
import type { Nullable } from "../utils";

import { useState } from "react";
import { useAutoPlayVideoTrack } from "./TrackBoundary";
import { useMergedStyle, VideoTrackStyle } from "./styles";

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
export function RemoteVideoTrack({ track, play, style, ...props }: RemoteVideoTrackProps) {
  const mergedStyle = useMergedStyle(VideoTrackStyle, style);
  const [div, setDiv] = useState<HTMLDivElement | null>(null);

  useAutoPlayVideoTrack(track, play, div);

  return <div {...props} ref={setDiv} style={mergedStyle} />;
}
