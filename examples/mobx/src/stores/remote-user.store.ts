import type {
  IAgoraRTCRemoteUser,
  IRemoteAudioTrack,
  IRemoteVideoTrack,
  UID,
} from "agora-rtc-sdk-ng";
import { makeAutoObservable } from "mobx";

import { fakeAvatar, fakeName } from "../utils";

/**
 * This class extracts fields from the IAgoraRTCRemoteUser object so that mobx can track them.
 *
 * `uid`, `audioTrack`, `videoTrack` → same\
 * `hasAudio` → `micOn`\
 * `hasVideo` → `cameraOn`
 */
export class MyRemoteUser {
  uid: UID;
  name: string;
  avatar: string;
  rtcUser: IAgoraRTCRemoteUser;
  cameraOn: boolean;
  micOn: boolean;
  videoTrack?: IRemoteVideoTrack;
  audioTrack?: IRemoteAudioTrack;

  constructor(rtcUser: IAgoraRTCRemoteUser) {
    this.uid = rtcUser.uid;
    this.name = fakeName(rtcUser.uid);
    this.avatar = fakeAvatar();
    this.rtcUser = rtcUser;
    this.micOn = rtcUser.hasAudio;
    this.cameraOn = rtcUser.hasVideo;
    this.audioTrack = rtcUser.audioTrack;
    this.videoTrack = rtcUser.videoTrack;

    makeAutoObservable(this);
  }

  update(rtcUser: IAgoraRTCRemoteUser) {
    this.rtcUser = rtcUser;
    this.micOn = rtcUser.hasAudio;
    this.cameraOn = rtcUser.hasVideo;
    this.audioTrack = rtcUser.audioTrack;
    this.videoTrack = rtcUser.videoTrack;
  }
}
