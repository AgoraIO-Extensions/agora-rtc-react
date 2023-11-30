import type {
  IAgoraRTCClient,
  IAgoraRTCError,
  IMicrophoneAudioTrack,
  MicrophoneAudioTrackInitConfig,
} from "agora-rtc-sdk-ng";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useState } from "react";

import { AgoraRTCReactError } from "../error";

import { useAsyncEffect, useIsUnmounted } from "./tools";
import { useIsConnected } from "./useIsConnected";

/**
 * This hook lets you create a local microphone audio track. You can call this method multiple times in different components to create multiple tracks. To access the same track in multiple components, pass the same track object to those components.
 * This hook can only create the audio track once before the component is destroyed.
 * After the component is unmounted, the audio track created by this hook stops publishing.
 *
 * @param ready - Whether it is ready to create the track. The default value is `true`.
 * @param audioTrackConfig - Configurations for initializing the microphone audio track. The default is `{ ANS: true, AEC: true }`. See [`MicrophoneAudioTrackInitConfig`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/microphoneaudiotrackinitconfig.html) for details.
 * @param client - Created using the Web SDK's [`IAgoraRTC.createClient`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartc.html#createclient) method.
 * @example
 * ```jsx
 * import { useLocalMicrophoneTrack } from "agora-rtc-react";
 *
 * function App() {
 *   const audioTrack = useLocalMicrophoneTrack(true, { ANS: true, AEC: true });
 *
 *   return <></>;
 * }
 * ```
 */
export function useLocalMicrophoneTrack(
  ready = true,
  audioTrackConfig: MicrophoneAudioTrackInitConfig = { ANS: true, AEC: true },
  client?: IAgoraRTCClient,
): {
  localMicrophoneTrack: IMicrophoneAudioTrack | null;
  isLoading: boolean;
  error: AgoraRTCReactError | null;
} {
  const isConnected = useIsConnected(client);
  const [track, setTrack] = useState<IMicrophoneAudioTrack | null>(null);
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
        const result = await AgoraRTC.createMicrophoneAudioTrack(audioTrackConfig);
        if (!isUnmountRef.current) {
          setTrack(result);
        }
      } catch (err) {
        console.error(err);
        if (!isUnmountRef.current) {
          setError(
            new AgoraRTCReactError("IAgoraRTC.createMicrophoneAudioTrack", err as IAgoraRTCError),
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
  return { localMicrophoneTrack: track, isLoading: isLoading, error: error };
}
