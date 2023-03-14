import "./RemoteUser.css";

import type { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import type { HTMLProps, PropsWithChildren } from "react";

import { forwardRef, useEffect } from "react";
import { useForceUpdate, useRTCClient, useSafePromise } from "../hooks";
import { RemoteAudioTrack } from "./RemoteAudioTrack";
import { RemoteVideoTrack } from "./RemoteVideoTrack";

export interface RemoteUserProps extends HTMLProps<HTMLDivElement> {
  /**
   * A remote user
   */
  readonly user?: IAgoraRTCRemoteUser;
  /**
   * Whether to play the remote user's video track.
   */
  readonly videoOn?: boolean;
  /**
   * Whether to play the remote user's audio track.
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
}

export const RemoteUser = /* @__PURE__ */ forwardRef<
  HTMLDivElement,
  PropsWithChildren<RemoteUserProps>
>(function RemoteUser(
  { user, videoOn, audioOn, playbackDeviceId, volume, children, className, ...props },
  ref,
) {
  const client = useRTCClient();
  const forceUpdate = useForceUpdate();
  const sp = useSafePromise();
  const hasAudio = user?.hasAudio;
  const hasVideo = user?.hasVideo;

  useEffect(() => {
    if (user && hasAudio && audioOn && !user.audioTrack) {
      sp(client.subscribe(user, "audio")).then(forceUpdate).catch(console.error);
    }
  }, [client, user, hasAudio, audioOn, sp, forceUpdate]);

  useEffect(() => {
    if (user && hasVideo && videoOn && !user.videoTrack) {
      sp(client.subscribe(user, "video")).then(forceUpdate).catch(console.error);
    }
  }, [client, user, hasVideo, videoOn, sp, forceUpdate]);

  useEffect(
    () => () => {
      if (user && (user.audioTrack || user.videoTrack)) {
        client.unsubscribe(user).catch(console.error);
      }
    },
    [user, client],
  );

  return (
    <div className={`agora-rtc-remote-user ${className ?? ""}`} {...props} ref={ref}>
      <RemoteVideoTrack
        className="agora-rtc-remote-user-video"
        track={user?.videoTrack}
        play={videoOn}
      />
      <RemoteAudioTrack
        playbackDeviceId={playbackDeviceId}
        volume={volume}
        track={user?.audioTrack}
        play={audioOn}
      />
      {children}
    </div>
  );
});
