import type { IAgoraRTCClient, IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import type { HTMLProps, ReactNode } from "react";

import { RemoteVideoTrack } from "./RemoteVideoTrack";
import { FloatBoxStyle, useMergedStyle, VideoTrackWrapperStyle } from "./styles";
import { UserCover } from "./UserCover";
import { useRTCClient } from "../hooks";

export interface RemoteVideoPlayerProps extends HTMLProps<HTMLDivElement> {
  /**
   * A remote track
   */
  readonly track?: IRemoteVideoTrack;
  /**
   * Whether to play the remote user's video track. Default follows `user.hasVideo`.
   */
  readonly playVideo?: boolean;
  /**
   * Render cover image if playVideo is off.
   */
  readonly cover?: string | (() => ReactNode);
  /**
   * Children is rendered on top of the video canvas.
   */
  readonly children?: ReactNode;
  /**
   * client instance
   */
  readonly client?: IAgoraRTCClient | null;
}

/**
 * Subscribe and play remote user video track.
 * An `IRemoteVideoTrack` can only be own by one `RemoteVideoPlayer`.
 */
export function RemoteVideoPlayer({
  track,
  playVideo,
  cover,
  client,
  style,
  children,
  ...props
}: RemoteVideoPlayerProps) {
  const mergedStyle = useMergedStyle(VideoTrackWrapperStyle, style);
  const resolvedClient = useRTCClient(client);
  const hasVideo = resolvedClient.remoteUsers?.find(
    user => user.uid === track?.getUserId(),
  )?.hasVideo;
  playVideo = playVideo ?? hasVideo;
  return (
    <div {...props} style={mergedStyle}>
      <RemoteVideoTrack play={playVideo} track={track} />
      {cover && !playVideo && <UserCover cover={cover} />}
      <div style={FloatBoxStyle}>{children}</div>
    </div>
  );
}
