import type { IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import type { MaybePromiseOrNull } from "../utils";
import type { LocalAudioTrackProps } from "./LocalAudioTrack";

import { useEffect } from "react";
import { useAwaited } from "../utils";
import { LocalAudioTrack } from "./LocalAudioTrack";

export interface MicrophoneAudioTrackProps extends LocalAudioTrackProps {
  readonly track?: MaybePromiseOrNull<IMicrophoneAudioTrack>;
  readonly deviceId?: string;
}

export function MicrophoneAudioTrack({ track, deviceId, ...props }: MicrophoneAudioTrackProps) {
  const trackData = useAwaited(track);

  useEffect(() => {
    if (trackData && deviceId) {
      trackData.setDevice(deviceId);
    }
  }, [deviceId, trackData]);

  return <LocalAudioTrack track={track} {...props} />;
}
