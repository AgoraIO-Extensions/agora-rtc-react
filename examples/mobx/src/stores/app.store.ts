import type { IAgoraRTCClient } from "agora-rtc-sdk-ng";

import AgoraRTC from "agora-rtc-sdk-ng";
import { makeAutoObservable } from "mobx";
import { MyUsers } from "./users.store";

AgoraRTC.setLogLevel(/* warning */ 2);

class AppStore {
  client: IAgoraRTCClient | null = null;
  users = new MyUsers();

  get uid() {
    return this.client?.uid;
  }

  constructor() {
    makeAutoObservable(this);
  }

  async join(appid: string, channel: string, token: string | null): Promise<void> {
    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    await client.join(appid, channel, token, null);
    this._updateClient(client);
  }

  async leave(): Promise<void> {
    this.users.dispose();
    const client = this.client;
    this._updateClient(null);
    await client?.leave();
  }

  private _updateClient(client: IAgoraRTCClient | null): void {
    this.client = client;
    this.users.updateClient(client);
  }
}

export type { AppStore };

export const appStore = new AppStore();

if (import.meta.env.DEV) {
  (window as any).appStore = appStore;
}
