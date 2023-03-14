import type { IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import type { FakeLocalAudioTrackProps } from "./local-audio-track";

import { FakeLocalAudioTrackImpl } from "./local-audio-track";

export interface FakeMicrophoneAudioTrackProps extends FakeLocalAudioTrackProps {}

export class FakeMicrophoneAudioTrackImpl extends FakeLocalAudioTrackImpl {
  public constructor(props: FakeMicrophoneAudioTrackProps = {}) {
    super(props);
  }
  /**
   * Sets the device for sampling audio.
   *
   * > You can call the method either before or after publishing an audio track.
   *
   * @param deviceId The ID of the specified device. You can get the `deviceId` by calling [AgoraRTC.getMicrophones]{@link IAgoraRTC.getMicrophones}.
   */
  public async setDevice(deviceId: string): Promise<void> {
    console.log("[FakeMicrophoneAudioTrack]: setDevice", deviceId);
  }
}

export const FakeMicrophoneAudioTrack =
  FakeMicrophoneAudioTrackImpl as unknown as IMicrophoneAudioTrack;
