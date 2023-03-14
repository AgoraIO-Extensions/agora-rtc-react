import "./RemoteUser.css";

import type { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import type { HTMLProps, PropsWithChildren } from "react";

import { forwardRef, useEffect, useRef } from "react";
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
  const subscribedRef = useRef(0b00); // 0b01: audio, 0b10: video, 0b11: both, 0: none
  const forceUpdate = useForceUpdate();
  const sp = useSafePromise();

  useEffect(() => {
    if (user && user.hasAudio && audioOn && !(subscribedRef.current & 0b01)) {
      subscribedRef.current |= 0b01;
      sp(client.subscribe(user, "audio")).then(forceUpdate).catch(console.error);
    }
  }, [client, user, audioOn, sp, forceUpdate]);

  useEffect(() => {
    if (user && user.hasVideo && videoOn && !(subscribedRef.current & 0b10)) {
      subscribedRef.current |= 0b10;
      sp(client.subscribe(user, "video")).then(forceUpdate).catch(console.error);
    }
  }, [client, user, videoOn, sp, forceUpdate]);

  useEffect(
    () => () => {
      if (user && (user.hasAudio || user.hasVideo) && subscribedRef.current) {
        subscribedRef.current = 0b00;
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
