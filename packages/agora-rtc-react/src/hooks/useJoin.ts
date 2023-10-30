import type { IAgoraRTCClient, IAgoraRTCError, UID } from "agora-rtc-sdk-ng";
import { useRef, useState } from "react";

import { AgoraRTCReactError } from "../error";
import { useRTCClient } from "../hooks/useRTCClient";
import type { AsyncTaskRunner } from "../misc/utils";
import { createAsyncTaskRunner, joinDisposers } from "../misc/utils";
import type { FetchArgs } from "../types";

import { useAsyncEffect, useIsUnmounted } from "./tools";
import { useIsConnected } from "./useIsConnected";

/**
 * This hook lets a user automatically join a channel when the component is ready and automatically leaves the channel when the component is unmounted.
 * You can customize the conditions required to join a channel using fetchArgs. For example, generating a token and other asynchronous operations can be performed before joining the channel.
 *
 * @param fetchArgs - The parameters or asynchronous function required to join the channel. See [`JoinOptions`](https://api-ref.agora.io/en/video-sdk/reactjs/2.x/interfaces/JoinOptions.html) for details.
 * @param ready - Whether the user is ready to join the channel. The default value is `true`.
 * @param client - Created using the Web SDK's [`IAgoraRTC.createClient`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartc.html#createclient) method.
 * @example
 * ```jsx
 * import { useJoin } from "agora-rtc-react";
 *
 * function App() {
 *   // Example: passing a function as first argument
 *   // useJoin(async () => {
 *   //   Fetch the token before joining the channel. Note that the data type of getData must be fetchArgs
 *   //   const getData = await getToken();
 *   //   return getData;
 *   // }, calling);
 *
 *   useJoin(
 *     {
 *       appid: YOUR_APPID,
 *       channel: YOUR_CHANNEL,
 *       token: YOUR_TOKEN,
 *     },
 *     ready,
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
  const runnerRef = useRef<AsyncTaskRunner | undefined>();

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

      const runner = (runnerRef.current ||= createAsyncTaskRunner());

      return joinDisposers([
        () => {
          runner.dispose();
        },
        () => {
          runner.run(() => resolvedClient.unpublish(resolvedClient.localTracks));
        },
        () => {
          for (const track of resolvedClient.localTracks) {
            if (track.isPlaying) {
              track.stop();
            }
            track.close();
          }
          runner.run(() => resolvedClient.leave());
        },
      ]);
    }
  }, [ready, client]);
  return {
    data: joinResult,
    isLoading: isLoading,
    isConnected: isConnected,
    error: error,
  };
}
