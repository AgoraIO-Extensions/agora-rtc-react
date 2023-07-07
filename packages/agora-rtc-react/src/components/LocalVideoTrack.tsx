import type { ILocalVideoTrack } from "agora-rtc-sdk-ng";
import type { HTMLProps } from "react";
import { useEffect, useState } from "react";

import { VideoTrackStyle, useMergedStyle } from "../assets/styles";
import { useAwaited } from "../hooks/tools";
import type { MaybePromiseOrNull } from "../misc/utils";

import { useAutoPlayVideoTrack } from "./TrackBoundary";

export interface LocalVideoTrackProps extends HTMLProps<HTMLDivElement> {
  /**
   * 要播放的本地视频轨道。通过 [IAgoraRTC.createScreenVideoTrack](./hooks#uselocalcameratrack">useLocalCameraTrack</a> 或 Web SDK 的 <a href="https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartc.html#createscreenvideotrack) 创建。
   */
  readonly track?: MaybePromiseOrNull<ILocalVideoTrack>;

  /**
   * `true`：播放该轨道。`false`：停止播放该轨道。
   */
  readonly play?: boolean;

  /**
   * `true`：禁用该轨道。禁用后，SDK 将停止播放和发布该轨道。`false`：启用该轨道。
   */
  readonly disabled?: boolean;

  /**
   * `true`：暂停发送该轨道的媒体数据。`false`：恢复发送该轨道的媒体数据。
   */
  readonly muted?: boolean;
}

/**
 * 该组件用于播放本地视频轨道，播放设备为用户在浏览器中选择的设备。
 */
export function LocalVideoTrack({
  track: maybeTrack,
  play,
  disabled,
  muted,
  style,
  ...props
}: LocalVideoTrackProps) {
  const mergedStyle = useMergedStyle(VideoTrackStyle, style);
  const [div, setDiv] = useState<HTMLDivElement | null>(null);

  const track = useAwaited(maybeTrack);

  useAutoPlayVideoTrack(track, play, div);

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

  return <div {...props} ref={setDiv} style={mergedStyle} />;
}
