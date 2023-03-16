import "./RemoteUser.css";

import type { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import type { HTMLProps, PropsWithChildren } from "react";

import { useRemoteUserTrack } from "../hooks";
import { RemoteAudioTrack } from "./RemoteAudioTrack";
import { RemoteVideoTrack } from "./RemoteVideoTrack";
import { UserCover } from "./UserCover";

export interface RemoteUserProps extends HTMLProps<HTMLDivElement> {
  /**
   * A remote user
   */
  readonly user?: IAgoraRTCRemoteUser;
  /**
   * Whether to play the remote user's video track. Default true.
   */
  readonly playVideo?: boolean;
  /**
   * Whether to play the remote user's audio track. Default true.
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
   * The volume. The value ranges from 0 (mute) to 100 (maximum). A value of 100 is the current volume.
   */
  readonly volume?: number;
  /**
   * Whether to darken the video canvas when the mouse hovers over it. Default false.
   */
  readonly darkenOnHover?: boolean;
  /**
   * Render cover image if playVideo is off.
   */
  readonly cover?: string;
}

/**
 * Subscribe and play remote user video and audio track.
 * High-level Component for rendering a remote user video and audio track.
 * An `IAgoraRTCRemoteUser` can only be own by one `RemoteUser`.
 */
export function RemoteUser({
  user,
  playVideo = true,
  playAudio = true,
  playbackDeviceId,
  volume,
  darkenOnHover,
  cover,
  children,
  className = "",
  ...props
}: PropsWithChildren<RemoteUserProps>) {
  const videoTrack = useRemoteUserTrack(user, "video");
  const audioTrack = useRemoteUserTrack(user, "audio");

  return (
    <div
      className={`arr-remote-user ${className} ${darkenOnHover ? "darken-on-hover" : ""}`}
      {...props}
    >
      <RemoteVideoTrack className="arr-remote-user-video" track={videoTrack} play={playVideo} />
      <RemoteAudioTrack
        playbackDeviceId={playbackDeviceId}
        volume={volume}
        track={audioTrack}
        play={playAudio}
      />
      {cover && !playVideo && <UserCover className="arr-remote-user-cover" cover={cover} />}
      <div className="arr-remote-user-body">{children}</div>
    </div>
  );
}
