import type { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import type { HTMLProps, ReactNode } from "react";

import { FloatBoxStyle, VideoTrackWrapperStyle, useMergedStyle } from "../assets/styles";
import { useRemoteUserTrack } from "../hooks";

import { RemoteAudioTrack } from "./RemoteAudioTrack";
import { RemoteVideoTrack } from "./RemoteVideoTrack";
import { UserCover } from "./UserCover";

export interface RemoteUserProps extends HTMLProps<HTMLDivElement> {
  /**
   * The remote user object.
   */
  readonly user?: IAgoraRTCRemoteUser;

  /**
   * `true`: Play the video track of the remote user.`false`: Stop playing the video track of the remote user.
   */
  readonly playVideo?: boolean;

  /**
   * `true`: Play the audio track of the remote user.`false`: Stop playing the audio track of the remote user.
   */
  readonly playAudio?: boolean;

  /**
   * The ID of the playback device, such as a speaker. The device ID can be obtained using [`IAgoraRTC.getPlaybackDevices`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartc.html#getplaybackdevices). This property is only supported in the desktop version of the Chrome browser. Modifying the value of this property in other browsers throws a `NOT_SUPPORTED` error.
   */
  readonly playbackDeviceId?: string;

  /**
   * The volume. The value ranges from 0 (mute) to 100 (the original volume).
   */
  readonly volume?: number;

  /**
   * The cover image or custom component to be displayed when `playVideo` is `false`, replacing the video frame. You can pass the URL of an online image or the relative path of a local image.
   */
  readonly cover?: string | (() => ReactNode);

  /**
   * The React nodes to be rendered.
   */
  readonly children?: ReactNode;
}

/**
 * This component plays the video and audio tracks of a remote user and supports specifying the audio device to use. Specifying the video playback device is not supported.
 * @example
 * ```jsx
 * import { RemoteUser, useRemoteUsers } from "agora-rtc-react";
 *
 * function App() {
 *   const remoteUsers = useRemoteUsers();
 *
 *   return (
 *     <>
 *       {remoteUsers.map(user => (
 *         <RemoteUser key={user.uid} user={user} />
 *       ))}
 *     </>
 *   );
 * }
 * ```
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
