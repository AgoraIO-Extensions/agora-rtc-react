import type { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import AgoraRTC from "agora-rtc-sdk-ng";
import { makeAutoObservable } from "mobx";

import { ShareScreen } from "./share-screen.store";
import { Users } from "./users.store";

AgoraRTC.setLogLevel(/* warning */ 2);

class AppStore {
  client: IAgoraRTCClient | null = null;
  users = new Users();
  shareScreen = new ShareScreen();

  get uid() {
    return this.client?.uid;
  }

  constructor() {
    this.users.localUIDs.push(this.shareScreen.uid);
    makeAutoObservable(this);
  }

  async join(appid: string, channel: string, token: string | null): Promise<void> {
    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    await client.join(appid, channel, token, null);
    this._updateClient(client);
  }

  async leave(): Promise<void> {
    this.users.dispose();
    await this.shareScreen.dispose();
    const client = this.client;
    if (client) {
      await client.leave();
      this._updateClient(null);
    }
  }

  private _updateClient(client: IAgoraRTCClient | null): void {
    this.client = client;
    this.users.updateClient(client);
    this.shareScreen.updateMainClient(client);
  }
}

export type { AppStore };

export const appStore = new AppStore();

if (import.meta.env.DEV) {
  window.appStore = appStore;
}
