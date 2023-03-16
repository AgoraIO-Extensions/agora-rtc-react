import { listen } from "agora-rtc-react";
import type {
  ConnectionState,
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  IRemoteAudioTrack,
  IRemoteVideoTrack,
  UID,
} from "agora-rtc-sdk-ng";

import AgoraRTC from "agora-rtc-sdk-ng";
import { makeAutoObservable, observable } from "mobx";
import { Disposable } from "side-effect-manager";
import { fakeAvatar, fakeName } from "./utils";

AgoraRTC.setLogLevel(/* warning */ 2);

interface MyRemoteUser {
  uid: UID;
  name: string;
  avatar: string;
  rtcUser: IAgoraRTCRemoteUser;
  cameraOn: boolean;
  micOn: boolean;
  videoTrack?: IRemoteVideoTrack;
  audioTrack?: IRemoteAudioTrack;
}

class AppStore {
  private readonly remoteUsersMap = observable.map<UID, MyRemoteUser>();
  private readonly disposable = new Disposable();

  client?: IAgoraRTCClient = void 0;
  connectionState: ConnectionState = "DISCONNECTED";

  uid?: UID = void 0;
  localMicTrack?: IMicrophoneAudioTrack = void 0;
  localCameraTrack?: ICameraVideoTrack = void 0;

  constructor() {
    makeAutoObservable(this);
  }

  get remoteUsers() {
    return [...this.remoteUsersMap.values()];
  }

  get avatar(): string {
    return fakeAvatar(this.uid || 0);
  }

  get name(): string {
    return fakeName(this.uid || 0);
  }

  async join(appid: string, channel: string, token: string | null): Promise<void> {
    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    this.disposable.push([
      // listen(client, "token-privilege-will-expire", () => renewToken()),

      listen(client, "connection-state-change", state => {
        this.updateConnectionState(state);
      }),

      // listen(client, "exception", console.warn),

      listen(client, "user-joined", user => {
        this.updateRemoteUser(user, true);
      }),

      listen(client, "user-left", user => {
        this.deleteRemoteUser(user.uid);
      }),

      listen(client, "user-published", async (user, mediaType) => {
        // ignore self
        if (user.uid === this.uid) return;
        await client.subscribe(user, mediaType);
        this.updateRemoteUser(user);
      }),

      listen(client, "user-unpublished", user => {
        this.updateRemoteUser(user);
      }),

      // listen(client, "network-quality", ({ uplinkNetworkQuality, downlinkNetworkQuality }) => {})
    ]);

    const uid = await client.join(appid, channel, token, null);
    this.updateClient(client, uid);
  }

  async leave(): Promise<void> {
    this.disposable.flushAll();
    if (this.localMicTrack) {
      this.localMicTrack.stop();
      this.localMicTrack.close();
      this.localMicTrack = void 0;
    }
    if (this.localCameraTrack) {
      this.localCameraTrack.stop();
      this.localCameraTrack.close();
      this.localCameraTrack = void 0;
    }
    if (this.client) {
      this.remoteUsers.forEach(({ rtcUser }) => {
        rtcUser.audioTrack?.stop();
        rtcUser.videoTrack?.stop();
      });
      this.remoteUsersMap.clear();

      await this.client.leave();
      this.updateClient(void 0, void 0);
      this.updateConnectionState("DISCONNECTED");
    }
  }

  async createLocalMicTrack(): Promise<void> {
    if (this.client && !this.localMicTrack) {
      const track = await AgoraRTC.createMicrophoneAudioTrack({
        AEC: true,
        ANS: true,
      });
      await this.client.publish(track);
      this.updateLocalMicTrack(track);
    }
  }

  async createLocalCameraTrack(): Promise<void> {
    if (this.client && !this.localMicTrack) {
      const track = await AgoraRTC.createCameraVideoTrack();
      await this.client.publish(track);
      this.updateLocalCameraTrack(track);
    }
  }

  private updateConnectionState(state: ConnectionState) {
    this.connectionState = state;
  }

  private updateClient(client?: IAgoraRTCClient, uid?: UID): void {
    this.client = client;
    this.uid = uid;
  }

  private updateRemoteUser(rtcUser: IAgoraRTCRemoteUser, createIfNotExist?: boolean): void {
    const user = this.remoteUsersMap.get(rtcUser.uid);
    // trigger MobX updates
    if (user) {
      user.rtcUser = rtcUser;
      user.cameraOn = rtcUser.hasVideo;
      user.micOn = rtcUser.hasAudio;
      user.audioTrack = rtcUser.audioTrack;
      user.videoTrack = rtcUser.videoTrack;
    } else if (createIfNotExist) {
      this.remoteUsersMap.set(
        rtcUser.uid,
        observable.object<MyRemoteUser>({
          uid: rtcUser.uid,
          name: fakeName(rtcUser.uid),
          avatar: fakeAvatar(rtcUser.uid),
          rtcUser,
          cameraOn: rtcUser.hasVideo,
          micOn: rtcUser.hasAudio,
          audioTrack: rtcUser.audioTrack,
          videoTrack: rtcUser.videoTrack,
        }),
      );
    }
  }

  private deleteRemoteUser(uid: UID): void {
    this.remoteUsersMap.delete(uid);
  }

  private updateLocalMicTrack(track: IMicrophoneAudioTrack): void {
    this.localMicTrack = track;
  }

  private updateLocalCameraTrack(track: ICameraVideoTrack): void {
    this.localCameraTrack = track;
  }
}

export type { AppStore };

export const appStore = new AppStore();

if (import.meta.env.DEV) {
  (window as any).appStore = appStore;
}
