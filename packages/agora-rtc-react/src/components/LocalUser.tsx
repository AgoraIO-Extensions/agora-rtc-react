import type { ILocalAudioTrack, ILocalVideoTrack } from "agora-rtc-sdk-ng";
import type { HTMLProps, ReactNode } from "react";

import { FloatBoxStyle, VideoTrackWrapperStyle, useMergedStyle } from "../assets/styles";
import type { MaybePromiseOrNull } from "../misc/utils";

import { LocalAudioTrack } from "./LocalAudioTrack";
import { LocalVideoTrack } from "./LocalVideoTrack";
import { UserCover } from "./UserCover";

export interface LocalUserProps extends HTMLProps<HTMLDivElement> {
  /**
   * `true`：打开本地用户的麦克风。`false`：关闭本地用户的麦克风。
   */
  readonly micOn?: boolean;

  /**
   * `true`：打开本地用户的摄像头。`false`：关闭本地用户的摄像头。
   */
  readonly cameraOn?: boolean;

  /**
   * 要播放的麦克风音频轨道。通过 [useLocalMicrophoneTrack](./hooks#uselocalmicrophonetrack) 创建。
   */
  readonly audioTrack?: MaybePromiseOrNull<ILocalAudioTrack>;

  /**
   * 要播放的摄像头视频轨道。通过 [useLocalCameraTrack](./hooks#uselocalcameratrack) 创建。
   */
  readonly videoTrack?: MaybePromiseOrNull<ILocalVideoTrack>;

  /**
   * `true`：播放本地用户的音频轨道。`false`：停止播放本地用户的音频轨道。
   */
  readonly playAudio?: boolean;

  /**
   * `true`：播放本地用户的视频轨道。`false`：停止播放本地用户的视频轨道。
   */
  readonly playVideo?: boolean;

  /**
   * 音量大小。取值范围 [0, 1000]，0 代表静音，100 代表原始音量。100 以上会使用 [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) 进行音量增益。
   */
  readonly volume?: number;

  /**
   * 当 `playVideo` 为 `false`时要渲染的封面图片，用于替代视频画面显示。支持传入在线图片的 URL 或本地图片的相对路径。
   */
  readonly cover?: string;

  /**
   * 需要展示的 React 节点。
   */
  readonly children?: ReactNode;
}

/**
 * 该组件用于播放本地用户的摄像头视频轨道和麦克风音频轨道（不支持指定使用的媒体设备）。
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
