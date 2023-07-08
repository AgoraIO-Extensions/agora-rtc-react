import type { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import type { HTMLProps, ReactNode } from "react";

import { FloatBoxStyle, VideoTrackWrapperStyle, useMergedStyle } from "../assets/styles";
import { useRemoteUserTrack } from "../hooks";

import { RemoteAudioTrack } from "./RemoteAudioTrack";
import { RemoteVideoTrack } from "./RemoteVideoTrack";
import { UserCover } from "./UserCover";

export interface RemoteUserProps extends HTMLProps<HTMLDivElement> {
  /**
   * 远端用户对象。详见 [IAgoraRTCRemoteUser](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartcremoteuser.html)。
   */
  readonly user?: IAgoraRTCRemoteUser;

  /**
   * `true`：播放远端用户的视频轨道。`false`：停止播放远端用户的视频轨道。
   */
  readonly playVideo?: boolean;

  /**
   * `true`：播放远端用户的音频轨道。`false`：停止播放远端用户的音频轨道。
   */
  readonly playAudio?: boolean;

  /**
   * 要使用的播放设备 ID，例如扬声器。设备 ID 通过 [getPlaybackDevices](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartc.html#getplaybackdevices) 获取。该属性仅支持桌面端的 Chrome 浏览器，在其它浏览器上修改该属性的值将会抛出 `NOT_SUPPORTED` 错误。
   */
  readonly playbackDeviceId?: string;

  /**
   * 音量大小。取值范围 [0, 100]，0 代表静音，100 代表原始音量。
   */
  readonly volume?: number;

  /**
   * 当 `playVideo` 为 `false`时要渲染的封面图片或自定义组件，用于替代视频画面显示。支持传入在线图片的 URL 或本地图片的相对路径。
   */
  readonly cover?: string | (() => ReactNode);

  /**
   * 需要展示的 React 节点。
   */
  readonly children?: ReactNode;
}

/**
 * 该组件用于播放远端用户的视频和音频轨道，并且仅支持指定使用的音频设备、不支持指定使用的视频设备。
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
