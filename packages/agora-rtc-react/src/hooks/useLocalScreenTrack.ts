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

/**
 * This hook lets you create a local video track for screen-sharing.
 * This hook can only create the video track once before the component is destroyed.
 * After the component is unmounted, the video track created by this hook stops publishing.
 *
 * @param ready - Whether it is ready to create the track. The default value is `true`.
 * @param screenVideoTrackInitConfig - Screen-sharing video configuration, including encoding and capturing configurations.
 * @param withAudio - Whether to share the audio of the screen-sharing input source during screen sharing. Supported values are `"enable"`, `"disable"`, and `"auto"`. See the parameters of [`createScreenVideoTrack`](https://api-ref.agora.io/en/video-sdk/reactjs/2.x//createScreenVideoTrack.html) for details.
 * @param client - Created using the Web SDK's [`IAgoraRTC.createClient`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartc.html#createclient) method.
 * @example
 * ```jsx
 * import { AgoraRTCScreenShareProvider, LocalVideoTrack, useLocalScreenTrack } from "agora-rtc-react";
 *
 * function App() {
 *   const { screenTrack, error } = useLocalScreenTrack(screenShareOn, {}, "disable");
 *
 *   return (
 *     <AgoraRTCScreenShareProvider client={client}>
 *       <LocalVideoTrack play style={{ width: "300px", height: "300px" }} track={screenTrack} />
 *     </AgoraRTCScreenShareProvider>
 *   );
 * }
 * ```
 */
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
