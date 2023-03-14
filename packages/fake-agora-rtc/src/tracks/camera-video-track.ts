import type { ICameraVideoTrack } from "agora-rtc-sdk-ng";
import type { FakeLocalVideoTrackProps } from "./local-video-track";

import { FakeLocalVideoTrackImpl } from "./local-video-track";

export interface FakeCameraVideoTrackProps extends FakeLocalVideoTrackProps {}

export class FakeCameraVideoTrackImpl extends FakeLocalVideoTrackImpl {
  public constructor(props: FakeCameraVideoTrackProps = {}) {
    super(props);
  }
  /**
   * Sets the device for capturing video.
   *
   * > You can call this method either before or after publishing the video track.
   *
   * @param deviceId The ID of the specified device. You can get the `deviceId` by calling [AgoraRTC.getCameras]{@link IAgoraRTC.getCameras}.
   */
  public async setDevice(deviceId: string): Promise<void> {
    console.log("[FakeCameraVideoTrack]: setDevice", deviceId);
  }
}

export const FakeCameraVideoTrack = FakeCameraVideoTrackImpl as unknown as ICameraVideoTrack;
