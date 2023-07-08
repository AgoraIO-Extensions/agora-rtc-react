import type {
  IAgoraRTCClient,
  IAgoraRTCError,
  IMicrophoneAudioTrack,
  MicrophoneAudioTrackInitConfig,
} from "agora-rtc-sdk-ng";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useState } from "react";

import { AgoraRTCReactError } from "../error";

import { useAsyncEffect, useIsUnmounted } from "./tools";
import { useIsConnected } from "./useIsConnected";

/**
 * 用于创建本地麦克风音频轨道。
 *
 * @param `ready` {boolean} 是否准备好创建轨道，默认为 `true`。
 * @param `audioTrackConfig` {MicrophoneAudioTrackInitConfig} 麦克风音频轨道的初始化配置，默认为 `{ ANS: true, AEC: true }`。详见 [MicrophoneAudioTrackInitConfig](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/microphoneaudiotrackinitconfig.html)。
 * @param `client` {IAgoraRTCClient} 通过 Web SDK 的 [IAgoraRTC.createClient](https://docportal.shengwang.cn/cn/video-call-4.x/API%20Reference/web_ng/interfaces/iagorartc.html#createclient) 创建。
 * @return localMicrophoneTrack IMicrophoneAudioTrack | null
 * @return isLoading boolean
 * @return error AgoraRTCReactError | null
 */
export function useLocalMicrophoneTrack(
  ready = true,
  audioTrackConfig: MicrophoneAudioTrackInitConfig = { ANS: true, AEC: true },
  client?: IAgoraRTCClient,
): {
  localMicrophoneTrack: IMicrophoneAudioTrack | null;
  isLoading: boolean;
  error: AgoraRTCReactError | null;
} {
  const isConnected = useIsConnected(client);
  const [track, setTrack] = useState<IMicrophoneAudioTrack | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AgoraRTCReactError | null>(null);
  const isUnmountRef = useIsUnmounted();

  useAsyncEffect(async () => {
    if (isConnected && ready && !track) {
      try {
        if (!isUnmountRef.current) {
          setIsLoading(true);
        }
        const result = await AgoraRTC.createMicrophoneAudioTrack(audioTrackConfig);
        if (!isUnmountRef.current) {
          setTrack(result);
        }
      } catch (err) {
        console.error(err);
        if (!isUnmountRef.current) {
          setError(
            new AgoraRTCReactError("IAgoraRTC.createMicrophoneAudioTrack", err as IAgoraRTCError),
          );
        }
      }
      if (!isUnmountRef.current) {
        setIsLoading(false);
      }
    }
    if (!isConnected && !isUnmountRef.current) {
      setTrack(null);
    }
  }, [isConnected, ready]);
  return { localMicrophoneTrack: track, isLoading: isLoading, error: error };
}
