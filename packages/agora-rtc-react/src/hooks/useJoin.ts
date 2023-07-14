import type { IAgoraRTCClient, IAgoraRTCError, UID } from "agora-rtc-sdk-ng";
import { useState } from "react";

import { AgoraRTCReactError } from "../error";
import { useRTCClient } from "../hooks/useRTCClient";
import type { FetchArgs } from "../types";

import { useAsyncEffect, useIsUnmounted } from "./tools";
import { useIsConnected } from "./useIsConnected";

/**
 * This hook lets a user automatically join a channel when the component is ready and automatically leaves the channel when the component is unmounted.
 *
 * @param `fetchArgs` {JoinOptions | (() => Promise<JoinOptions>)} The parameters or asynchronous function required to join the channel. See [`JoinOptions`](https://doc.shengwang.cn/api-ref/rtc/react/react-sdk/data-types#joinoptions) for details.
 * @param `ready` {boolean} Whether the user is ready to join the channel. The default value is `true`.
 * @param `client` {IAgoraRTCClient} Created using the Web SDK's [`IAgoraRTC.createClient`](https://docportal.shengwang.cn/cn/video-call-4.x/API%20Reference/web_ng/interfaces/iagorartc.html#createclient) method.
 * @return data UID
 * @return isLoading boolean 、
 * @return isConnected boolean
 * @return error AgoraRTCReactError | null
 * @example
 * ```jsx
 * import { useJoin } from "agora-rtc-react";
 *
 * function App() {
 *   // you can use useJoin like this by passing a function as first argument.
 *   // useJoin(async () => {
 *   //   you can do some actions like fetching token before calling join.
 *   //   const getData = await getToken();
 *   //   return getData;  The data type of getData must be fetchArgs
 *   // }, calling);
 *
 *   useJoin(
 *     {
 *       appid: YOUR_APPID,
 *       channel: YOUR_CHANNEL,
 *       token: YOUR_TOKEN,
 *     },
 *     ready
 *   );
 *
 *   return <></>;
 * }
 * ```
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
