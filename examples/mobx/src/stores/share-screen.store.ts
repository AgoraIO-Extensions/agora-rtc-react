import type {
  ILocalAudioTrack,
  ILocalTrack,
  ILocalVideoTrack,
  IRemoteAudioTrack,
  IRemoteTrack,
  IRemoteVideoTrack,
  UID,
} from "agora-rtc-sdk-ng";
import AgoraRTC from "agora-rtc-sdk-ng";
import { makeAutoObservable } from "mobx";
import { appId, channel, token } from "../constants";

export const ShareScreenUID: UID = 10;

export class ShareScreen {
  readonly uid = ShareScreenUID;
  readonly client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

  enabled = false;
  localAudioTrack: ILocalAudioTrack | null = null;
  localVideoTrack: ILocalVideoTrack | null = null;
  remoteAudioTrack: IRemoteAudioTrack | null = null;
  remoteVideoTrack: IRemoteVideoTrack | null = null;

  get isRunning() {
    return this.enabled || this.remoteVideoTrack != null;
  }

  constructor() {
    makeAutoObservable(this);
  }

  setRemoteTrack(track: IRemoteTrack | null, mediaType: "audio" | "video") {
    if (mediaType === "audio") {
      this.remoteAudioTrack = track as IRemoteAudioTrack;
    } else {
      this.remoteVideoTrack = track as IRemoteVideoTrack;
    }
  }

  private _pTogglingShareScreen?: Promise<void>;

  async enable() {
    if (this.remoteVideoTrack) {
      throw new Error("remote screen video track already exists");
    }

    if (this._pTogglingShareScreen) {
      await this._pTogglingShareScreen;
    }

    if (!this.localVideoTrack) {
      let resolve!: () => void;
      this._pTogglingShareScreen = new Promise<void>(resolve_ => {
        resolve = resolve_;
      });

      await this.createLocalTracks();
      await this.client.join(appId, channel, token, ShareScreenUID);
      await this.client.publish(this._getLocalTracks());

      resolve();
      this._pTogglingShareScreen = undefined;
    }

    this.enabled = true;
  }

  async disable() {
    this.enabled = false;

    if (this._pTogglingShareScreen) {
      await this._pTogglingShareScreen;
    }

    if (this.localVideoTrack) {
      let resolve!: () => void;
      this._pTogglingShareScreen = new Promise<void>(resolve_ => {
        resolve = resolve_;
      });

      await this.client.unpublish(this._getLocalTracks());
      this.localVideoTrack.close();
      this.localVideoTrack = null;
      if (this.localAudioTrack) {
        this.localAudioTrack.close();
        this.localAudioTrack = null;
      }
      await this.client.leave();

      resolve();
      this._pTogglingShareScreen = undefined;
    }
  }

  async createLocalTracks() {
    const ret = await AgoraRTC.createScreenVideoTrack({}, "auto");
    if (Array.isArray(ret)) {
      [this.localVideoTrack, this.localAudioTrack] = ret;
    } else {
      this.localVideoTrack = ret;
      this.localAudioTrack = null;
    }
    this.localVideoTrack.once("track-ended", () => this.disable());
  }

  private _getLocalTracks(): ILocalTrack[] {
    return [this.localAudioTrack, this.localVideoTrack].filter(Boolean) as ILocalTrack[];
  }
}

export const shareScreen = new ShareScreen();
