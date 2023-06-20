import type { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import type { HTMLProps, ReactNode } from "react";

import { useRemoteUserTrack } from "../hooks";

import { RemoteAudioTrack } from "./RemoteAudioTrack";
import { RemoteVideoTrack } from "./RemoteVideoTrack";
import { UserCover } from "./UserCover";
import { FloatBoxStyle, VideoTrackWrapperStyle, useMergedStyle } from "./styles";

export interface RemoteUserProps extends HTMLProps<HTMLDivElement> {
  /**
   * A remote user
   */
  readonly user?: IAgoraRTCRemoteUser;
  /**
   * Whether to play the remote user's video track. Default follows `user.hasVideo`.
   */
  readonly playVideo?: boolean;
  /**
   * Whether to play the remote user's audio track. Default follows `user.hasAudio`.
   */
  readonly playAudio?: boolean;
  /**
   * Device ID, which can be retrieved by calling `getPlaybackDevices`.
   *
   * Changes of the ID will invoke `setPlaybackDevice` which sets the audio playback device, for example, the speaker.
   *
   * > `setPlaybackDevice` supports Chrome on desktop devices only. Other browsers throw a `NOT_SUPPORTED` error when calling the method.
   */
  readonly playbackDeviceId?: string;
  /**
   * The volume. The value ranges from 0 (mute) to 1000 (maximum). A value of 100 is the current volume.
   */
  readonly volume?: number;
  /**
   * Render cover image if playVideo is off.
   */
  readonly cover?: string | (() => ReactNode);
  /**
   * Children is rendered on top of the video canvas.
   */
  readonly children?: ReactNode;
}

/**
 * Subscribe and play remote user video and audio track.
 * An `IAgoraRTCRemoteUser` can only be own by one `RemoteUser`.
 */
export function RemoteUser({
  user,
  playVideo,
  playAudio,
  playbackDeviceId,
  volume,
  cover,
  style,
  children,
  ...props
}: RemoteUserProps) {
  const mergedStyle = useMergedStyle(VideoTrackWrapperStyle, style);
  const { track: videoTrack } = useRemoteUserTrack(user, "video");
  const { track: audioTrack } = useRemoteUserTrack(user, "audio");

  playVideo = playVideo ?? user?.hasVideo;
  playAudio = playAudio ?? user?.hasAudio;

  return (
    <div {...props} style={mergedStyle}>
      <RemoteVideoTrack play={playVideo} track={videoTrack} />
      <RemoteAudioTrack
        play={playAudio}
        playbackDeviceId={playbackDeviceId}
        track={audioTrack}
        volume={volume}
      />
      {cover && !playVideo && <UserCover cover={cover} />}
      <div style={FloatBoxStyle}>{children}</div>
    </div>
  );
}
