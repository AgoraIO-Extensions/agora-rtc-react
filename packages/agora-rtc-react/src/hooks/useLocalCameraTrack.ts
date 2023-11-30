import type {
  CameraVideoTrackInitConfig,
  IAgoraRTCClient,
  IAgoraRTCError,
  ICameraVideoTrack,
} from "agora-rtc-sdk-ng";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useState } from "react";

import { AgoraRTCReactError } from "../error";

import { useAsyncEffect, useIsUnmounted } from "./tools";
import { useIsConnected } from "./useIsConnected";

/**
 * This hook lets you create a local camera video track. You can call this method multiple times in different components to create multiple tracks. To access the same track in multiple components, pass the same track object to those components.
 * This hook can only create the video track once before the component is destroyed.
 * After the component is unmounted, the video track created by this hook stops publishing.
 *
 * @param ready - Whether it is ready to create the track. The default value is `true`.
 * @param cameraVideoTrackConfig - Configurations for initializing the camera video track. See [`CameraVideoTrackInitConfig`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/cameravideotrackinitconfig.html) for details.
 * @param client - Created using the Web SDK's [`IAgoraRTC.createClient`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartc.html#createclient) method.
 * @example
 * ```jsx
 * import { useLocalCameraTrack } from "agora-rtc-react";
 *
 * function App() {
 *   const videoTrack = useLocalCameraTrack();
 *
 *   return <></>;
 * }
 * ```
 */
export function useLocalCameraTrack(
  ready = true,
  cameraVideoTrackConfig?: CameraVideoTrackInitConfig,
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
        const result = await AgoraRTC.createCameraVideoTrack(cameraVideoTrackConfig);
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
