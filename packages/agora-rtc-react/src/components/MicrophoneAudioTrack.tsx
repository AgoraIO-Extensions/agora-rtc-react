import type { IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import type { ReactNode } from "react";
import { useEffect } from "react";

import { useAwaited } from "../hooks";
import type { MaybePromiseOrNull } from "../utils";

import type { LocalAudioTrackProps } from "./LocalAudioTrack";
import { LocalAudioTrack } from "./LocalAudioTrack";

export interface MicrophoneAudioTrackProps extends LocalAudioTrackProps {
  /**
   * A microphone audio track which can be created by `createMicrophoneAudioTrack()`.
   */
  readonly track?: MaybePromiseOrNull<IMicrophoneAudioTrack>;
  /**
   * Device ID, which can be retrieved by calling `getDevices()`.
   */
  readonly deviceId?: string;

  readonly children?: ReactNode;
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
}: MicrophoneAudioTrackProps) {
  const track = useAwaited(maybeTrack);

  useEffect(() => {
    if (track && deviceId != null) {
      track.setDevice(deviceId).catch(console.warn);
    }
  }, [deviceId, track]);

  return <LocalAudioTrack track={maybeTrack} {...props} />;
}
