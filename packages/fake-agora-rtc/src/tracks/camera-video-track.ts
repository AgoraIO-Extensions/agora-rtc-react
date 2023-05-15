import type { ICameraVideoTrack } from "agora-rtc-sdk-ng";

import type { FakeLocalVideoTrackProps } from "./local-video-track";
import { FakeLocalVideoTrack } from "./local-video-track";

export interface FakeCameraVideoTrackProps extends FakeLocalVideoTrackProps {}

export class FakeCameraVideoTrack extends FakeLocalVideoTrack {
  public static override create(props?: FakeCameraVideoTrackProps): ICameraVideoTrack {
    return new FakeCameraVideoTrack(props) as unknown as ICameraVideoTrack;
  }
  /**
   * Sets the device for capturing video.
   *
   * > You can call this method either before or after publishing the video track.
   *
   * @param deviceId The ID of the specified device. You can get the `deviceId` by calling AgoraRTC.getCameras().
   */
  public async setDevice(deviceId: string): Promise<void> {
    console.log("[FakeCameraVideoTrack]: setDevice", deviceId);
  }
}
