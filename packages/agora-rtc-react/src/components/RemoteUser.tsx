import "./RemoteUser.css";

import type { IAgoraRTCRemoteUser, IRemoteAudioTrack, IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import type { HTMLProps, PropsWithChildren } from "react";
import { useState } from "react";

import { memo, useEffect } from "react";
import { useRemoteUserTrack, useRTCClient } from "../hooks";
import { RemoteAudioTrack } from "./RemoteAudioTrack";
import { RemoteVideoTrack } from "./RemoteVideoTrack";
import { listen } from "../listen";

export interface RemoteUserProps extends HTMLProps<HTMLDivElement> {
  /**
   * A remote user
   */
  readonly user?: IAgoraRTCRemoteUser;
  /**
   * Whether to play the remote user's video track. Default true.
   */
  readonly videoOn?: boolean;
  /**
   * Whether to play the remote user's audio track. Default true.
   */
  readonly audioOn?: boolean;
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
}

/**
 * Subscribe and play remote user video and audio track.
 * High-level Component for rendering a remote user video and audio track.
 * An `IAgoraRTCRemoteUser` can only be own by one `RemoteUser`.
 */
export const RemoteUser = /* @__PURE__ */ memo<PropsWithChildren<RemoteUserProps>>(
  function RemoteUser({
    user,
    videoOn = true,
    audioOn = true,
    playbackDeviceId,
    volume,
    darkenOnHover,
    children,
    className = "",
    ...props
  }) {
    const videoTrack = useRemoteUserTrack(user, "video");
    const audioTrack = useRemoteUserTrack(user, "audio");

    return (
      <div
        className={`arr-remote-user ${className} ${darkenOnHover ? "darken-on-hover" : ""}`}
        {...props}
      >
        <RemoteVideoTrack className="arr-remote-user-video" track={videoTrack} play={videoOn} />
        <RemoteAudioTrack
          playbackDeviceId={playbackDeviceId}
          volume={volume}
          track={audioTrack}
          play={audioOn}
        />
        <div className="arr-remote-user-body">{children}</div>
      </div>
    );
  },
);
