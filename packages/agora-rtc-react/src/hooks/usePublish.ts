import type { IAgoraRTCClient, IAgoraRTCError, ILocalTrack } from "agora-rtc-sdk-ng";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useRef, useState } from "react";

import { AgoraRTCReactError } from "../error";
import { useRTCClient } from "../hooks/useRTCClient";

import { compareVersion, useAsyncEffect, useIsUnmounted } from "./tools";
import { useIsConnected } from "./useIsConnected";

/**
 * 用于发布本地轨道。当组件准备好时发布，当组件卸载时取消发布。
 *
 * @param `tracks` {(ILocalTrack | null)[]} 本地轨道列表。
 * @param `readyToPublish` {boolean} 是否准备好进行发布。默认为 `true`。
 * @param `client` {IAgoraRTCClient} [IAgoraRTCClient](https://docportal.shengwang.cn/cn/live-streaming-premium-4.x/API%20Reference/web_ng/interfaces/iagorartcclient.html) 对象。
 * @return isLoading boolean
 * @return error AgoraRtcReactError | null
 */
export function usePublish(
  tracks: (ILocalTrack | null)[],
  readyToPublish = true,
  client?: IAgoraRTCClient,
): {
  isLoading: boolean;
  error: AgoraRTCReactError | null;
} {
  const resolvedClient = useRTCClient(client);
  const isConnected = useIsConnected(client);
  //maintain an internal ref to track published
  const pubTracks = useRef<(ILocalTrack | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AgoraRTCReactError | null>(null);
  const isUnmountRef = useIsUnmounted();

  useAsyncEffect(async () => {
    if (!isUnmountRef.current) {
      setIsLoading(false);
      setError(null);
    }
    if (!resolvedClient || !isConnected || !readyToPublish) {
      return;
    }

    const filterTracks = tracks.filter(Boolean);
    const baseCheck = (_track: ILocalTrack): boolean => {
      const isSupport = compareVersion(AgoraRTC.VERSION, "4.18.1") >= 0;
      if (!isSupport) {
        const agoraRTCReactError = new AgoraRTCReactError(
          "usePublish",
          "please check your agora-rtc-sdk-ng version in package.json, it's recommend upgrade to >= 4.18.1",
        );
        agoraRTCReactError.log("warn");
      }
      return isSupport
        ? resolvedClient.mode !== "live" || resolvedClient.role !== "audience"
        : true;
    };
    const isPublished = (track: ILocalTrack): boolean => {
      return pubTracks.current.some(
        pubTrack => pubTrack && pubTrack.getTrackId() === track.getTrackId(),
      );
    };
    const canPublish = (track: ILocalTrack): boolean => {
      return baseCheck(track) && track.enabled && readyToPublish && !isPublished(track);
    };

    for (let i = 0; i < filterTracks.length; i++) {
      const track = filterTracks[i];
      if (track) {
        if (canPublish(track)) {
          try {
            if (!isUnmountRef.current) {
              setIsLoading(true);
            }
            await resolvedClient.publish(track);
          } catch (err) {
            console.error(err);
            if (!isUnmountRef.current) {
              setError(new AgoraRTCReactError("IAgoraRTCClient.publish", err as IAgoraRTCError));
            }
          }
          if (!isUnmountRef.current) {
            setIsLoading(false);
          }
        }
      }
    }
    pubTracks.current = filterTracks;

    // published tracks will be unpublished on unmount by useJoin
  }, [isConnected, readyToPublish, resolvedClient, tracks]);

  return { isLoading: isLoading, error: error };
}
