import type { ILocalAudioTrack, ILocalVideoTrack } from "agora-rtc-sdk-ng";
import type { HTMLProps, ReactNode } from "react";

import { FloatBoxStyle, VideoTrackWrapperStyle, useMergedStyle } from "../assets/styles";
import type { MaybePromiseOrNull } from "../misc/utils";

import { LocalAudioTrack } from "./LocalAudioTrack";
import { LocalVideoTrack } from "./LocalVideoTrack";
import { UserCover } from "./UserCover";

export interface LocalUserProps extends HTMLProps<HTMLDivElement> {
  /**
   * `true`: Enable the local user's microphone.`false`: Disable the local user's microphone.
   */
  readonly micOn?: boolean;

  /**
   * `true`: Enable the local user's camera.`false`: Disable the local user's camera.
   */
  readonly cameraOn?: boolean;

  /**
   * The microphone audio track to be played, which can be created by calling [`useLocalMicrophoneTrack`](https://api-ref.agora.io/en/video-sdk/reactjs/2.x/functions/useLocalMicrophoneTrack.html).
   */
  readonly audioTrack?: MaybePromiseOrNull<ILocalAudioTrack>;

  /**
   * The camera video track to be played, which can be created by calling [`useLocalCameraTrack`](https://api-ref.agora.io/en/video-sdk/reactjs/2.x/functions/useLocalCameraTrack.html).
   */
  readonly videoTrack?: MaybePromiseOrNull<ILocalVideoTrack>;

  /**
   * `true`: Play the local user's audio track.`false`: Stop playing the local user's audio track.
   */
  readonly playAudio?: boolean;

  /**
   * `true`: Play the local user's video track.`false`: Stop playing the local user's video track.
   */
  readonly playVideo?: boolean;

  /**
   * The volume. The value ranges from 0 (mute) to 1000 (maximum). A value of 100 is the original volume. When set to above 100, the SDK applies volume amplification using the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).
   */
  readonly volume?: number;

  /**
   * The cover image to be displayed when `playVideo` is `false`, replacing the video frame. You can pass the URL of an online image or the relative path of a local image.
   */
  readonly cover?: string;

  /**
   * The React nodes to be rendered.
   */
  readonly children?: ReactNode;
}

/**
 * This component plays the camera video track and the microphone audio track of the local user using the playback devices selected by the user in the browser.
 * @example
 * ```jsx
 * import { LocalUser, useLocalAudioTrack, useLocalCameraTrack } from "agora-rtc-react";
 *
 * function App() {
 *   const audioTrack = useLocalAudioTrack();
 *   const videoTrack = useLocalCameraTrack();
 *
 *   return (
 *     <LocalUser
 *       audioTrack={audioTrack}
 *       cameraOn
 *       cover={COVER_IMAGE_URL}
 *       micOn
 *       playAudio
 *       playVideo
 *       videoTrack={videoTrack}
 *     />
 *   );
 * }
 * ```
 */
export function LocalUser({
  micOn,
  cameraOn,
  audioTrack,
  videoTrack,
  playAudio,
  playVideo,
  volume,
  cover,
  children,
  style,
  ...props
}: LocalUserProps) {
  const mergedStyle = useMergedStyle(VideoTrackWrapperStyle, style);
  playVideo = playVideo ?? !!cameraOn;
  playAudio = playAudio ?? !!micOn;
  return (
    <div {...props} style={mergedStyle}>
      <LocalVideoTrack disabled={!cameraOn} play={playVideo} track={videoTrack} />
      <LocalAudioTrack disabled={!micOn} play={playAudio} track={audioTrack} volume={volume} />
      {cover && !cameraOn && <UserCover cover={cover} />}
      <div style={FloatBoxStyle}>{children}</div>
    </div>
  );
}
