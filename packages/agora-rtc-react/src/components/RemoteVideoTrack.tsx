import type { IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import type { HTMLProps } from "react";
import { useState } from "react";

import { VideoTrackStyle, useMergedStyle } from "../assets/styles";
import type { Nullable } from "../misc/utils";

import { useAutoPlayVideoTrack } from "./TrackBoundary";

export interface RemoteVideoTrackProps extends HTMLProps<HTMLDivElement> {
  /**
   * The remote video track object.
   */
  readonly track?: Nullable<IRemoteVideoTrack>;

  /**
   * `true`: Play the track.`false`: Stop playing the track.
   */
  readonly play?: boolean;
}

/**
 * This component plays the video track of a remote user and does not support specifying the playback device.
 * @example
 * ```jsx
 * import { RemoteAudioTrack, useJoin, useRemoteAudioTracks, useRemoteUsers } from "agora-rtc-react";
 *
 * function App() {
 *   const remoteUsers = useRemoteUsers();
 *   const audioTracks = useRemoteAudioTracks(remoteUsers);
 *
 *   return (
 *     <>
 *       {audioTracks.map(track => (
 *         <RemoteAudioTrack key={track.getUserId()} play track={track} />
 *       ))}
 *     </>
 *   );
 * }
 * ```
 */
export function RemoteVideoTrack({ track, play, style, ...props }: RemoteVideoTrackProps) {
  const mergedStyle = useMergedStyle(VideoTrackStyle, style);
  const [div, setDiv] = useState<HTMLDivElement | null>(null);

  useAutoPlayVideoTrack(track, play, div);

  return <div {...props} ref={setDiv} style={mergedStyle} />;
}
