import type { IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import type { PropsWithChildren } from "react";
import type { MaybePromiseOrNull } from "../utils";
import type { LocalAudioTrackProps } from "./LocalAudioTrack";

import { useEffect } from "react";
import { useAwaited } from "../hooks";
import { LocalAudioTrack } from "./LocalAudioTrack";

export interface MicrophoneAudioTrackProps extends LocalAudioTrackProps {
  /**
   * A local audio track which can be created by `createMicrophoneAudioTrack()`.
   */
  readonly track?: MaybePromiseOrNull<IMicrophoneAudioTrack>;
  /**
   * Device ID, which can be retrieved by calling `getDevices()`.
   */
  readonly deviceId?: string;
}

/**
 * A component which renders a microphone audio track, with device options.
 *
 * ```jsx
 * const track = useMemo(() => AgoraRTC.createMicrophoneAudioTrack(), [])
 * return <MicrophoneAudioTrack track={track} play />
 * ```
 */
export function MicrophoneAudioTrack({
  track: maybeTrack,
  deviceId,
  ...props
}: PropsWithChildren<MicrophoneAudioTrackProps>) {
  const track = useAwaited(maybeTrack);

  useEffect(() => {
    if (track && deviceId != null) {
      track.setDevice(deviceId).catch(console.warn);
    }
  }, [deviceId, track]);

  return <LocalAudioTrack track={maybeTrack} {...props} />;
}
