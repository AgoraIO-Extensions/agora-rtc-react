import type { LocalVideoTrackProps } from "agora-rtc-react";
import type { ICameraVideoTrack } from "agora-rtc-react";
import { LocalVideoTrack } from "agora-rtc-react";
import { useAwaited } from "agora-rtc-react/src/hooks/tools";
import type { MaybePromiseOrNull } from "agora-rtc-react/src/misc/utils";
import { useEffect } from "react";

export interface CameraVideoTrackProps extends LocalVideoTrackProps {
  /**
   * A camera video track which can be created by `createCameraVideoTrack()`.
   */
  readonly track?: MaybePromiseOrNull<ICameraVideoTrack>;
  /**
   * Device ID, which can be retrieved by calling `getDevices()`.
   */
  readonly deviceId?: string;
}

/**
 * A component which renders a camera video track, with device options.
 *
 * ```jsx
 * const track = useMemo(() => AgoraRTC.createCameraVideoTrack(), [])
 * return <CameraVideoTrack track={track} play />
 * ```
 */
export function CameraVideoTrack({ track: maybeTrack, deviceId, ...props }: CameraVideoTrackProps) {
  const track = useAwaited(maybeTrack);

  useEffect(() => {
    if (track && deviceId != null) {
      track.setDevice(deviceId).catch(console.warn);
    }
  }, [deviceId, track]);

  return <LocalVideoTrack track={maybeTrack} {...props} />;
}
