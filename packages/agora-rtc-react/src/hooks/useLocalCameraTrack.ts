import type { IAgoraRTCClient, IAgoraRTCError, ICameraVideoTrack } from "agora-rtc-sdk-ng";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useState } from "react";

import { AgoraRTCReactError } from "../error";

import { useAsyncEffect, useIsUnmounted } from "./tools";
import { useIsConnected } from "./useIsConnected";

/**
 * 用于创建本地摄像头视频轨道。
 *
 * @param `ready` {boolean} 是否准备好创建轨道，默认为 `true`。
 * @param `client` {IAgoraRTCClient} 通过 Web SDK 的 [IAgoraRTC.createClient](https://docportal.shengwang.cn/cn/video-call-4.x/API%20Reference/web_ng/interfaces/iagorartc.html#createclient) 创建。
 * @return localCameraTrack ICameraVideoTrack | null
 * @return isLoading boolean
 * @return error AgoraRTCReactError | null
 * @example
 * ```jsx
 * import { useLocalCameraTrack } from "agora-rtc-react";
 *
 * function App() {
 *   const audioTrack = useLocalCameraTrack();
 *
 *   return <></>;
 * }
 * ```
 */
export function useLocalCameraTrack(
  ready = true,
  client?: IAgoraRTCClient,
): {
  localCameraTrack: ICameraVideoTrack | null;
  isLoading: boolean;
  error: AgoraRTCReactError | null;
} {
  const isConnected = useIsConnected(client);
  const [track, setTrack] = useState<ICameraVideoTrack | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AgoraRTCReactError | null>(null);
  const isUnmountRef = useIsUnmounted();

  useAsyncEffect(async () => {
    if (!isUnmountRef.current) {
      setIsLoading(false);
      setError(null);
    }

    if (isConnected && ready && !track) {
      try {
        if (!isUnmountRef.current) {
          setIsLoading(true);
        }
        const result = await AgoraRTC.createCameraVideoTrack();
        if (!isUnmountRef.current) {
          setTrack(result);
        }
      } catch (err) {
        console.error(err);
        if (!isUnmountRef.current) {
          setError(
            new AgoraRTCReactError("IAgoraRTC.createCameraVideoTrack", err as IAgoraRTCError),
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
  return { localCameraTrack: track, isLoading: isLoading, error: error };
}
