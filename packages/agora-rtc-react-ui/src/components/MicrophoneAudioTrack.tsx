import type { LocalAudioTrackProps } from "agora-rtc-react";
import type { IMicrophoneAudioTrack } from "agora-rtc-react";
import { LocalAudioTrack } from "agora-rtc-react";
import { useAwaited } from "agora-rtc-react/src/hooks/tools";
import type { MaybePromiseOrNull } from "agora-rtc-react/src/misc/utils";
import type { ReactNode } from "react";
import { useEffect } from "react";

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
