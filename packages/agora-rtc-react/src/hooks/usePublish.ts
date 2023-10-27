import type { IAgoraRTCClient, IAgoraRTCError, ILocalTrack } from "agora-rtc-sdk-ng";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useRef, useState } from "react";

import { AgoraRTCReactError } from "../error";
import { useRTCClient } from "../hooks/useRTCClient";

import { compareVersion, useAsyncEffect, useIsUnmounted } from "./tools";
import { useIsConnected } from "./useIsConnected";

/**
 * This hook lets you publish the local tracks when the component is ready and unpublish them when the component is unmounted.
 *
 * @param tracks - The list of local tracks.
 * @param readyToPublish - Whether the local tracks are ready to publish. The default value is `true`.
 * @param client - Created using the Web SDK's [`IAgoraRTC.createClient`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartc.html#createclient) method.
 * @example
 * ```jsx
 * import { useLocalMicrophoneTrack, useLocalCameraTrack, usePublish } from "agora-rtc-react";
 *
 * function App() {
 *   // get audioTrack and videoTrack before publish
 *   const audioTrack = useLocalMicrophoneTrack();
 *   const videoTrack = useLocalCameraTrack();
 *   usePublish([audioTrack, videoTrack]);
 *
 *   return <></>;
 * }
 * ```
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
      const isSupport = compareVersion(AgoraRTC.VERSION, "4.18.2") >= 0;
      if (!isSupport) {
        const agoraRTCReactError = new AgoraRTCReactError(
          "usePublish",
          "please check your agora-rtc-sdk-ng version in package.json, it's recommend upgrade to >= 4.18.2",
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
          await resolvedClient.unpublish(
            pubTracks.current.filter(
              pubTrack => pubTrack?.trackMediaType === track.trackMediaType,
            ) as ILocalTrack[],
          );
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
