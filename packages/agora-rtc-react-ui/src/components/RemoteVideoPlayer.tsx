import type { IAgoraRTCClient, IRemoteVideoTrack, VideoPlayerConfig } from "agora-rtc-react";
import { RemoteVideoTrack, useRTCClient } from "agora-rtc-react";
import {
  FloatBoxStyle,
  VideoTrackWrapperStyle,
  useMergedStyle,
} from "agora-rtc-react/src/assets/styles";
import { UserCover } from "agora-rtc-react/src/components/UserCover";
import type { HTMLProps, ReactNode } from "react";

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
  /**
   * Playback configurations for a video track. Set the playback configurations for a video track when calling [ILocalVideoTrack.play]{@link ILocalVideoTrack.play}.
   */
  readonly videoPlayerConfig?: VideoPlayerConfig;
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
  videoPlayerConfig,
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
      <RemoteVideoTrack play={playVideo} track={track} videoPlayerConfig={videoPlayerConfig} />
      {cover && !playVideo && <UserCover cover={cover} />}
      <div style={FloatBoxStyle}>{children}</div>
    </div>
  );
}
