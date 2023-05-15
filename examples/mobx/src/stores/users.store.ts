import { listen } from "agora-rtc-react";
import type { IAgoraRTCClient, IAgoraRTCRemoteUser, UID } from "agora-rtc-sdk-ng";
import { makeAutoObservable, observable } from "mobx";
import { SideEffectManager } from "side-effect-manager";

import { MyLocalUser } from "./local-user.store";
import { MyRemoteUser } from "./remote-user.store";

export class Users {
  private readonly _remoteUsersMap = observable.map<UID, MyRemoteUser>();
  private readonly _sideEffect = new SideEffectManager();

  /** will not be included in `remoteUsers` and will not be subscribed */
  readonly localUIDs: UID[] = [];

  localUser: MyLocalUser | null = null;

  get remoteUsers() {
    return [...this._remoteUsersMap.values()];
  }

  constructor() {
    makeAutoObservable(this);
  }

  updateClient(client: IAgoraRTCClient | null) {
    this._sideEffect.add(() => {
      if (client && client.uid) {
        const localUser = new MyLocalUser({ client, uid: client.uid });
        this.localUser = localUser;

        return [
          () => {
            localUser.dispose();
            this.localUser = null;
          },

          listen(client, "user-joined", user => {
            // ignore locals
            if (this.localUIDs.includes(user.uid)) return;
            this._updateRemoteUser(user, true);
          }),

          listen(client, "user-left", user => {
            // ignore locals
            if (this.localUIDs.includes(user.uid)) return;
            this._deleteRemoteUser(user.uid);
          }),

          listen(client, "user-published", user => {
            // ignore self
            if (user.uid === client.uid) return;
            // ignore locals
            if (this.localUIDs.includes(user.uid)) return;
            // normal remote user
            this._updateRemoteUser(user);
          }),

          listen(client, "user-unpublished", user => {
            // ignore self
            if (user.uid === client.uid) return;
            // ignore locals
            if (this.localUIDs.includes(user.uid)) return;
            // normal remote user
            this._updateRemoteUser(user);
          }),
        ];
      } else {
        return null;
      }
    }, "update-client");
  }

  dispose() {
    this._sideEffect.flushAll();
    this.remoteUsers.forEach(({ rtcUser }) => {
      rtcUser.audioTrack?.stop();
      rtcUser.videoTrack?.stop();
    });
    this._remoteUsersMap.clear();
  }

  private _updateRemoteUser(rtcUser: IAgoraRTCRemoteUser, createIfNotExist?: boolean): void {
    const user = this._remoteUsersMap.get(rtcUser.uid);
    // trigger MobX updates
    if (user) {
      user.update(rtcUser);
    } else if (createIfNotExist) {
      this._remoteUsersMap.set(rtcUser.uid, new MyRemoteUser(rtcUser));
    }
  }

  private _deleteRemoteUser(uid: UID): void {
    this._remoteUsersMap.delete(uid);
  }
}
