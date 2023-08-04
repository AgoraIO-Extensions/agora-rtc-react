import type { IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import type { ReactNode } from "react";
import { useEffect } from "react";

import type { Nullable } from "../misc/utils";

import { useAutoPlayAudioTrack } from "./TrackBoundary";

export interface RemoteAudioTrackProps {
  /**
   * The remote audio track to be played.
   */
  readonly track?: Nullable<IRemoteAudioTrack>;

  /**
   * `true`: Play the track.`false`: Stop playing the track.
   */
  readonly play?: boolean;

  /**
   * The ID of the playback device, such as a speaker. The device ID can be obtained using [`IAgoraRTC.getPlaybackDevices`](https://api-ref.agora.io/en/video-sdk/web/4.x/interfaces/iagorartc.html#getplaybackdevices). This property is only supported in the desktop version of Chrome browser. Modifying the value of this property in other browsers throws a `NOT_SUPPORTED` error.
   */
  readonly playbackDeviceId?: string;

  /**
   * The volume. The value ranges from 0 (mute) to 100 (the original volume).
   */
  readonly volume?: number;

  /**
   * The React nodes to be rendered.
   */
  readonly children?: ReactNode;
}

/**
 * This component plays the audio track of a remote user with the playback device you specify.
 * @example
 * ```jsx
 * import { RemoteAudioTrack, useJoin, useRemoteAudioTracks, useRemoteUsers } from "agora-rtc-react";
 *
 * function App() {
 *   const remoteUsers = useRemoteUsers();
 *   const audioTracks = useRemoteAudioTracks(remoteUsers);
 *
 *   return (
 *     <>
 *       {audioTracks.map(track => (
 *         <RemoteAudioTrack key={track.getUserId()} play track={track} />
 *       ))}
 *     </>
 *   );
 * }
 * ```
 */
export function RemoteAudioTrack({
  track,
  play = false,
  playbackDeviceId,
  volume,
  children,
}: RemoteAudioTrackProps) {
  useAutoPlayAudioTrack(track, play);

  useEffect(() => {
    if (track && playbackDeviceId != null) {
      track.setPlaybackDevice(playbackDeviceId).catch(console.warn);
    }
  }, [track, playbackDeviceId]);

  useEffect(() => {
    if (track && volume != null) {
      track.setVolume(volume);
    }
  }, [track, volume]);

  return children ? <>{children}</> : null;
}
