import { listen } from "agora-rtc-react";
import type {
  ConnectionState,
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
  UID,
} from "agora-rtc-sdk-ng";

import AgoraRTC from "agora-rtc-sdk-ng";
import { makeAutoObservable, observable } from "mobx";
import { SideEffectManager } from "side-effect-manager";

AgoraRTC.setLogLevel(/* warning */ 2);

class AppStore {
  readonly sideEffect = new SideEffectManager();

  connectionState: ConnectionState = "DISCONNECTED";
  uid?: UID = void 0;
  client?: IAgoraRTCClient = void 0;
  localMicTrack?: IMicrophoneAudioTrack = void 0;
  localCameraTrack?: ICameraVideoTrack = void 0;
  remoteUsers = observable.map<UID, IAgoraRTCRemoteUser>();
  publishedRemoteUsers = observable.map<UID, IAgoraRTCRemoteUser>();

  constructor() {
    makeAutoObservable(this);
  }

  get remoteUsersAsArray() {
    return Array.from(this.remoteUsers.values());
  }

  async join(appid: string, channel: string, token: string | null): Promise<void> {
    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    this.sideEffect.push([
      // listen(client, "token-privilege-will-expire", () => renewToken()),

      listen(client, "connection-state-change", state => {
        this.updateConnectionState(state);
      }),

      // listen(client, "exception", console.warn),

      listen(client, "user-joined", user => {
        this.updateRemoteUser(user);
      }),

      listen(client, "user-left", user => {
        this.deleteRemoteUser(user);
      }),

      listen(client, "user-published", async (user, mediaType) => {
        // ignore self
        if (user.uid === this.uid) return;
        await client.subscribe(user, mediaType);
        this.updatePublishedRemoteUsers();
      }),

      listen(client, "user-unpublished", () => {
        this.updatePublishedRemoteUsers();
      }),

      // listen(client, "network-quality", ({ uplinkNetworkQuality, downlinkNetworkQuality }) => {})
    ]);

    const uid = await client.join(appid, channel, token, null);
    this.updateClient(client, uid);
  }

  async leave(): Promise<void> {
    this.sideEffect.flushAll();
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
      this.remoteUsers.forEach(user => {
        user.audioTrack?.stop();
        user.videoTrack?.stop();
      });
      this.remoteUsers.clear();

      await this.client.leave();
      this.updateClient(void 0, void 0);
      this.updateConnectionState("DISCONNECTED");
    }
  }

  updateConnectionState(state: ConnectionState) {
    this.connectionState = state;
  }

  updateClient(client?: IAgoraRTCClient, uid?: UID): void {
    this.client = client;
    this.uid = uid;
  }

  updateRemoteUser(user: IAgoraRTCRemoteUser): void {
    this.remoteUsers.set(user.uid, user);
  }

  updatePublishedRemoteUsers() {
    const publishedRemoteUsers = new Map();
    for (const user of this.remoteUsers.values()) {
      if (user.hasAudio || user.hasVideo) {
        publishedRemoteUsers.set(user.uid, user);
      }
    }
    this.publishedRemoteUsers.replace(publishedRemoteUsers);
  }

  deleteRemoteUser(user: IAgoraRTCRemoteUser): void {
    this.remoteUsers.delete(user.uid);
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

  updateLocalMicTrack(track: IMicrophoneAudioTrack): void {
    this.localMicTrack = track;
  }

  updateLocalCameraTrack(track: ICameraVideoTrack): void {
    this.localCameraTrack = track;
  }
}

export type { AppStore };

export const appStore = new AppStore();

if (import.meta.env.DEV) {
  (window as any).appStore = appStore;
}
