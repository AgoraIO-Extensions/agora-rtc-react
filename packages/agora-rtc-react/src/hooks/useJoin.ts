import type { IAgoraRTCClient, IAgoraRTCError, UID } from "agora-rtc-sdk-ng";
import { useState } from "react";

import { AgoraRTCReactError } from "../error";
import { useRTCClient } from "../hooks/useRTCClient";
import type { FetchArgs } from "../types";

import { useAsyncEffect, useIsUnmounted } from "./tools";
import { useIsConnected } from "./useIsConnected";

/**
 * 用于加入频道。当组件准备好时加入频道，当组件卸载时自动离开频道。
 *
 * @param `fetchArgs` {joinOptions | (() => Promise<joinOptions>)} 加入频道所需参数或异步函数。详见 [joinOptions](./interfaces#joinoptions)。
 * @param `ready` {boolean} 是否准备好加入频道。默认为 `true`。
 * @param `client` {IAgoraRTCClient} [IAgoraRTCClient](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartcclient.html) 对象。
 * @return data UID
 * @return isLoading boolean
 * @return isConnected boolean
 * @return error AgoraRtcReactError | null
 */
export function useJoin(
  fetchArgs: FetchArgs,
  ready = true,
  client?: IAgoraRTCClient | null,
): { data: UID; isLoading: boolean; isConnected: boolean; error: AgoraRTCReactError | null } {
  const resolvedClient = useRTCClient(client);
  const isConnected = useIsConnected(client);

  const [isLoading, setIsLoading] = useState(false);
  const [joinResult, setJoinResult] = useState<UID>(0);
  const [error, setError] = useState<AgoraRTCReactError | null>(null);
  const isUnmountRef = useIsUnmounted();

  useAsyncEffect(async () => {
    if (!isUnmountRef.current) {
      setError(null);
      setJoinResult(0);
      setIsLoading(false);
    }

    if (ready && resolvedClient) {
      try {
        if (!isUnmountRef.current) {
          setIsLoading(true);
        }
        const { appid, channel, token, uid } =
          typeof fetchArgs === "function" ? await fetchArgs() : fetchArgs;
        const result = await resolvedClient.join(appid, channel, token, uid);
        if (!isUnmountRef.current) {
          setJoinResult(result);
        }
      } catch (err) {
        console.error(err);
        if (!isUnmountRef.current) {
          setError(new AgoraRTCReactError("IAgoraRTCClient.join", err as IAgoraRTCError));
        }
      }
      if (!isUnmountRef.current) {
        setIsLoading(false);
      }
      return () => {
        for (const track of resolvedClient.localTracks) {
          if (track.isPlaying) {
            track.stop();
          }
          track.close();
        }
        return resolvedClient.leave();
      };
    }
  }, [ready, client]);
  return {
    data: joinResult,
    isLoading: isLoading,
    isConnected: isConnected,
    error: error,
  };
}
