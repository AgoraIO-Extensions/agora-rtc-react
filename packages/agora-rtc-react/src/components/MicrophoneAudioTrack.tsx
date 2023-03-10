import type { IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import type { MaybePromiseOrNull } from "../utils";
import type { LocalAudioTrackProps } from "./LocalAudioTrack";

import { useEffect } from "react";
import { useAwaited } from "../utils";
import { LocalAudioTrack } from "./LocalAudioTrack";

export interface MicrophoneAudioTrackProps extends LocalAudioTrackProps {
  readonly track?: MaybePromiseOrNull<IMicrophoneAudioTrack>;
  readonly deviceId?: string;
  readonly enabled?: boolean;
}

export function MicrophoneAudioTrack({
  track,
  deviceId,
  enabled,
  ...props
}: MicrophoneAudioTrackProps) {
  const trackData = useAwaited(track);

  useEffect(() => {
    if (trackData && deviceId != null) {
      trackData.setDevice(deviceId).catch(console.error);
    }
  }, [deviceId, trackData]);

  useEffect(() => {
    if (trackData && enabled != null) {
      trackData.setEnabled(enabled).catch(console.error);
    }
  }, [enabled, trackData]);

  return <LocalAudioTrack track={track} {...props} />;
}
