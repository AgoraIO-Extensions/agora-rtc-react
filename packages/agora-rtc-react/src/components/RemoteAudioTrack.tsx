import type { IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import type { ReactNode } from "react";
import { useEffect } from "react";

import type { Nullable } from "../misc/utils";

import { useAutoPlayAudioTrack } from "./TrackBoundary";

export interface RemoteAudioTrackProps {
  /**
   * 要播放的远端音频轨道。详见 [IRemoteAudioTrack](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iremoteaudiotrack.html)。
   */
  readonly track?: Nullable<IRemoteAudioTrack>;

  /**
   * `true`：播放该轨道。`false`：停止播放该轨道。
   */
  readonly play?: boolean;

  /**
   * 要使用的播放设备 ID，例如扬声器。设备 ID 通过 [getPlaybackDevices](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartc.html#getplaybackdevices) 获取。该属性仅支持桌面端的 Chrome 浏览器，在其它浏览器上修改该属性的值将会抛出 `NOT_SUPPORTED` 错误。
   */
  readonly playbackDeviceId?: string;

  /**
   * 音量大小。取值范围 [0, 100]，0 代表静音，100 代表原始音量。
   */
  readonly volume?: number;

  /**
   * 需要展示的 React 节点。
   */
  readonly children?: ReactNode;
}

/**
 * 该组件用于播放远端用户的音频轨道，并且支持指定播放设备。
 * @example
 * ```jsx
 * import { RemoteAudioTrack, useJoin, useRemoteAudioTracks, useRemoteUsers } from "agora-rtc-react";
 *
 * function App() {
 *   const remoteUsers = useRemoteUsers();
 *   const audioTracks = useRemoteAudioTracks(remoteUsers);
 *
 *   return (
 *     <>
 *       {audioTracks.map(track => (
 *         <RemoteAudioTrack key={track.getUserId()} play track={track} />
 *       ))}
 *     </>
 *   );
 * }
 * ```
 */
export function RemoteAudioTrack({
  track,
  play = false,
  playbackDeviceId,
  volume,
  children,
}: RemoteAudioTrackProps) {
  useAutoPlayAudioTrack(track, play);

  useEffect(() => {
    if (track && playbackDeviceId != null) {
      track.setPlaybackDevice(playbackDeviceId).catch(console.warn);
    }
  }, [track, playbackDeviceId]);

  useEffect(() => {
    if (track && volume != null) {
      track.setVolume(volume);
    }
  }, [track, volume]);

  return children ? <>{children}</> : null;
}
