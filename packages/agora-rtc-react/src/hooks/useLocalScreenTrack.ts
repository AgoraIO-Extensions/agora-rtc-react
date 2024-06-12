import type {
  IAgoraRTCClient,
  IAgoraRTCError,
  ILocalAudioTrack,
  ILocalVideoTrack,
  ScreenVideoTrackInitConfig,
} from "agora-rtc-sdk-ng";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useState } from "react";

import { AgoraRTCReactError } from "../error";

import { useAsyncEffect, useIsUnmounted } from "./tools";
import { useIsConnected } from "./useIsConnected";

export function useLocalScreenTrack(
  ready: boolean,
  screenVideoTrackInitConfig: ScreenVideoTrackInitConfig,
  withAudio: "enable",
  client?: IAgoraRTCClient,
): {
  screenTrack: [ILocalVideoTrack, ILocalAudioTrack] | null;
  isLoading: boolean;
  error: AgoraRTCReactError | null;
};
export function useLocalScreenTrack(
  ready: boolean,
  screenVideoTrackInitConfig: ScreenVideoTrackInitConfig,
  withAudio: "disable",
  client?: IAgoraRTCClient,
): {
  screenTrack: ILocalVideoTrack | null;
  isLoading: boolean;
  error: AgoraRTCReactError | null;
};
export function useLocalScreenTrack(
  ready: boolean,
  screenVideoTrackInitConfig: ScreenVideoTrackInitConfig,
  withAudio: "auto",
  client?: IAgoraRTCClient,
): {
  screenTrack: [ILocalVideoTrack, ILocalAudioTrack] | ILocalVideoTrack | null;
  isLoading: boolean;
  error: AgoraRTCReactError | null;
};
export function useLocalScreenTrack(
  ready = true,
  screenVideoTrackInitConfig: ScreenVideoTrackInitConfig,
  withAudio: "enable" | "disable" | "auto",
  client?: IAgoraRTCClient,
): {
  screenTrack: [ILocalVideoTrack, ILocalAudioTrack] | ILocalVideoTrack | null;
  isLoading: boolean;
  error: AgoraRTCReactError | null;
} {
  const isConnected = useIsConnected(client);
  const [track, setTrack] = useState<
    [ILocalVideoTrack, ILocalAudioTrack] | ILocalVideoTrack | null
  >(null);
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
        const result = await AgoraRTC.createScreenVideoTrack(screenVideoTrackInitConfig, withAudio);
        if (!isUnmountRef.current) {
          setTrack(result);
        }
      } catch (err) {
        console.error(err);
        if (!isUnmountRef.current) {
          setError(
            new AgoraRTCReactError("IAgoraRTC.createScreenVideoTrack", err as IAgoraRTCError),
          );
        }
      }
      if (!isUnmountRef.current) {
        setIsLoading(false);
      }
    }
    if ((!isConnected || !ready) && !isUnmountRef.current) {
      setTrack(null);
    }
  }, [isConnected, ready]);
  return { screenTrack: track, isLoading: isLoading, error: error };
}
