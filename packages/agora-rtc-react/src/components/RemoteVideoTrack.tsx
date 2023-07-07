import type { IRemoteVideoTrack } from "agora-rtc-sdk-ng";
import type { HTMLProps } from "react";
import { useState } from "react";

import { VideoTrackStyle, useMergedStyle } from "../assets/styles";
import type { Nullable } from "../misc/utils";

import { useAutoPlayVideoTrack } from "./TrackBoundary";

export interface RemoteVideoTrackProps extends HTMLProps<HTMLDivElement> {
  /**
   * 远端视频轨道对象。详见 [IRemoteVideoTrack](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iremotevideotrack.html)。
   */
  readonly track?: Nullable<IRemoteVideoTrack>;

  /**
   * `true`：播放该轨道。`false`：停止播放该轨道。
   */
  readonly play?: boolean;
}

/**
 * 该组件用于播放远端用户的视频轨道，并且不支持指定播放设备。
 */
export function RemoteVideoTrack({ track, play, style, ...props }: RemoteVideoTrackProps) {
  const mergedStyle = useMergedStyle(VideoTrackStyle, style);
  const [div, setDiv] = useState<HTMLDivElement | null>(null);

  useAutoPlayVideoTrack(track, play, div);

  return <div {...props} ref={setDiv} style={mergedStyle} />;
}
