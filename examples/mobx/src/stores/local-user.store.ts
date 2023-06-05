import type {
  IAgoraRTCClient,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  UID,
} from "agora-rtc-sdk-ng";
import AgoraRTC from "agora-rtc-sdk-ng";
import { makeAutoObservable } from "mobx";

import { fakeAvatar, fakeName } from "../utils";

export class MyLocalUser {
  readonly client: IAgoraRTCClient;

  uid: UID;
  name: string;
  avatar: string;
  micOn: boolean;
  cameraOn: boolean;
  micTrack?: IMicrophoneAudioTrack;
  cameraTrack?: ICameraVideoTrack;

  constructor({ client, uid }: { client: IAgoraRTCClient; uid: UID }) {
    this.client = client;
    this.uid = uid;
    this.name = fakeName(this.uid);
    this.avatar = fakeAvatar();
    this.micOn = false;
    this.cameraOn = false;
    this.micTrack = void 0;
    this.cameraTrack = void 0;

    makeAutoObservable(this);
  }

  setMic = (micOn: boolean) => {
    this.micOn = micOn;
    if (micOn && !this.micTrack) {
      this.createLocalMicTrack().then(() => this.setMic(this.micOn));
    }
    if (this.micTrack) {
      this.micTrack.setEnabled(micOn);
    }
  };

  setCamera = (cameraOn: boolean) => {
    this.cameraOn = cameraOn;
    if (cameraOn && !this.cameraTrack) {
      this.createLocalCameraTrack().then(() => this.setCamera(this.cameraOn));
    }
    if (this.cameraTrack) {
      this.cameraTrack.setEnabled(cameraOn);
    }
  };

  async createLocalMicTrack(): Promise<IMicrophoneAudioTrack> {
    if (this.client && !this.micTrack) {
      const track = await AgoraRTC.createMicrophoneAudioTrack({
        AEC: true,
        ANS: true,
      });
      await this.client.publish(track);
      this.updateLocalMicTrack(track);
    }
    if (this.micTrack) {
      return this.micTrack;
    }
    return Promise.reject();
  }

  updateLocalMicTrack(track: IMicrophoneAudioTrack) {
    this.micTrack = track;
  }

  async createLocalCameraTrack(): Promise<ICameraVideoTrack> {
    if (this.client && !this.cameraTrack) {
      const track = await AgoraRTC.createCameraVideoTrack();
      await this.client.publish(track);
      this.updateLocalCameraTrack(track);
    }
    if (this.cameraTrack) {
      return this.cameraTrack;
    }
    return Promise.reject();
  }

  updateLocalCameraTrack(track: ICameraVideoTrack) {
    this.cameraTrack = track;
  }

  dispose() {
    if (this.micTrack) {
      this.micTrack.stop();
      this.micTrack.close();
      this.micTrack = void 0;
    }
    if (this.cameraTrack) {
      this.cameraTrack.stop();
      this.cameraTrack.close();
      this.cameraTrack = void 0;
    }
  }
}
