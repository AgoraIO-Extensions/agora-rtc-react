import type { IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";

import type { FakeLocalAudioTrackProps } from "./local-audio-track";
import { FakeLocalAudioTrack } from "./local-audio-track";

export interface FakeMicrophoneAudioTrackProps extends FakeLocalAudioTrackProps {}

export class FakeMicrophoneAudioTrack extends FakeLocalAudioTrack {
  public static override create(props?: FakeMicrophoneAudioTrackProps): IMicrophoneAudioTrack {
    return new FakeMicrophoneAudioTrack(props) as unknown as IMicrophoneAudioTrack;
  }
  /**
   * Sets the device for sampling audio.
   *
   * > You can call the method either before or after publishing an audio track.
   *
   * @param deviceId The ID of the specified device. You can get the `deviceId` by calling AgoraRTC.getMicrophones().
   */
  public async setDevice(deviceId: string): Promise<void> {
    console.log("[FakeMicrophoneAudioTrack]: setDevice", deviceId);
  }
}
