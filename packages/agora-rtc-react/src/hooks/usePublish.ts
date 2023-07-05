import type { IAgoraRTCClient, IAgoraRTCError, ILocalTrack } from "agora-rtc-sdk-ng";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useRef, useState } from "react";

import { AgoraRTCReactError } from "../error";
import { useRTCClient } from "../hooks/useRTCClient";

import { compareVersion, useAsyncEffect, useIsUnmounted } from "./tools";
import { useIsConnected } from "./useIsConnected";

/**
 * publish tacks when readyToPublish is true
 * unpublish on unmount.
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
        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          resolvedClient.mode !== "live" || resolvedClient.role !== "audience"
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
