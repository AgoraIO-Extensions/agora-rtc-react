import type { ILocalAudioTrack } from "agora-rtc-sdk-ng";
import type { ReactNode } from "react";
import { useEffect } from "react";

import { useAwaited } from "../hooks/tools";
import type { MaybePromiseOrNull } from "../misc/utils";

import { useAutoPlayAudioTrack } from "./TrackBoundary";

export interface LocalAudioTrackProps {
  /**
   * 要播放的本地音频轨道。通过 [useLocalMicrophoneTrack](./hooks#uselocalmicrophonetrack) 创建。
   */
  readonly track?: MaybePromiseOrNull<ILocalAudioTrack>;

  /**
   * `true`：播放该轨道。`false`：停止播放该轨道。
   */
  readonly play?: boolean;

  /**
   * 音量大小。取值范围 [0, 1000]，0 代表静音，100 代表原始音量。100 以上会使用 [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) 进行音量增益。
   */
  readonly volume?: number;

  /**
   * `true`：禁用该轨道。禁用后，SDK 将停止播放和发布该轨道。`false`：启用该轨道。
   */
  readonly disabled?: boolean;

  /**
   * `true`：暂停发送该轨道的媒体数据。`false`：恢复发送该轨道的媒体数据。
   */
  readonly muted?: boolean;

  /**
   * 需要展示的 React 节点。
   */
  readonly children?: ReactNode;
}

/**
 * 该组件用于播放本地音频轨道，播放设备为用户在浏览器中选择的设备。
 * @example
 * ```jsx
 * import { LocalAudioTrack, useLocalAudioTrack } from "agora-rtc-react";
 *
 * function App() {
 *   const audioTrack = useLocalAudioTrack();
 *   return <LocalAudioTrack track={audioTrack} play />;
 * }
 * ```
 */
export function LocalAudioTrack({
  track: maybeTrack,
  play = false,
  volume,
  disabled,
  muted,
  children,
}: LocalAudioTrackProps) {
  const track = useAwaited(maybeTrack);

  useAutoPlayAudioTrack(track, play);

  useEffect(() => {
    if (track && volume != null) {
      track.setVolume(volume);
    }
  }, [track, volume]);

  useEffect(() => {
    if (track && disabled != null) {
      track.setEnabled(!disabled).catch(console.warn);
    }
  }, [disabled, track]);

  useEffect(() => {
    if (track && muted != null) {
      track.setMuted(muted).catch(console.warn);
    }
  }, [muted, track]);

  return children ? <>{children}</> : null;
}
