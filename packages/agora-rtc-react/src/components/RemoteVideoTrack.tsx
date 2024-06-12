import type { IRemoteVideoTrack, VideoPlayerConfig } from "agora-rtc-sdk-ng";
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

  /**
   * Playback configurations for a video track including setting the mirror and display mode. The SDK enables mirror mode for the local video track by default. See [`VideoPlayerConfig`](https://api-ref.agora.io/en/video-sdk/reactjs/2.x//VideoPlayerConfig.html) for details.
   */
  readonly videoPlayerConfig?: VideoPlayerConfig;
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
export function RemoteVideoTrack({
  track,
  play,
  style,
  videoPlayerConfig,
  ...props
}: RemoteVideoTrackProps) {
  const mergedStyle = useMergedStyle(VideoTrackStyle, style);
  const [div, setDiv] = useState<HTMLDivElement | null>(null);

  useAutoPlayVideoTrack(track, play, videoPlayerConfig, div);

  return <div {...props} ref={setDiv} style={mergedStyle} />;
}
