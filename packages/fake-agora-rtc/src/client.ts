import { randNumber, randUuid } from "@ngneat/falso";
import type {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  IRemoteAudioTrack,
  IRemoteTrack,
  IRemoteVideoTrack,
  UID,
} from "agora-rtc-sdk-ng";
import { SideEffectManager } from "side-effect-manager";

import { FakeAgoraEventEmitter } from "./eventemitter";
import { FakeRemoteAudioTrack, FakeRemoteVideoTrack } from "./tracks";
import { hideProperties } from "./utils";

export class FakeRTCClient extends FakeAgoraEventEmitter {
  remoteUsers: IAgoraRTCRemoteUser[] = [];

  public static create(
    executor?: Partial<IAgoraRTCClient> | ((client: FakeRTCClient) => Partial<IAgoraRTCClient>),
  ): IAgoraRTCClient {
    const client = new FakeRTCClient();
    const partialClient = typeof executor === "function" ? executor(client) : executor;
    return Object.assign(client, partialClient) as unknown as IAgoraRTCClient;
  }

  private _sideEffect = new SideEffectManager();

  public constructor() {
    super();
    hideProperties(this, "_disposable");
  }

  /**
   * Subscribes to the audio and/or video tracks of a remote user.
   *
   * ```javascript
   * await client.subscribe(user，"audio");
   * user.audioTrack.play();
   * ```
   * @param user The remote user.
   * @param mediaType The media type of the tracks to subscribe to.
   * - `"video"`: Subscribe to the video track only.
   * - `"audio"`: Subscribe to the audio track only.
   *
   * @returns When the subscription succeeds, the SDK adds the subscribed tracks to [user.audioTrack]{@link IAgoraRTCRemoteUser.audioTrack} and [user.videoTrack]{@link IAgoraRTCRemoteUser.videoTrack}. You can go on to call [audioTrack.play]{@link IRemoteAudioTrack.play} or [videoTrack.play]{@link IRemoteVideoTrack.play} to play the tracks.
   * > The `Promise` object throws the `TRACK_IS_NOT_PUBLISHED` error if the specified tracks do not exist.
   * @category Agora Core
   */
  public subscribe(user: IAgoraRTCRemoteUser, mediaType: "video"): Promise<IRemoteVideoTrack>;
  /**
   * Subscribes to the audio and/or video tracks of a remote user.
   *
   * ```javascript
   * await client.subscribe(user，"audio");
   * user.audioTrack.play();
   * ```
   * @param user The remote user.
   * @param mediaType The media type of the tracks to subscribe to.
   * - `"video"`: Subscribe to the video track only.
   * - `"audio"`: Subscribe to the audio track only.
   *
   * @returns When the subscription succeeds, the SDK adds the subscribed tracks to [user.audioTrack]{@link IAgoraRTCRemoteUser.audioTrack} and [user.videoTrack]{@link IAgoraRTCRemoteUser.videoTrack}. You can go on to call [audioTrack.play]{@link IRemoteAudioTrack.play} or [videoTrack.play]{@link IRemoteVideoTrack.play} to play the tracks.
   * > The `Promise` object throws the `TRACK_IS_NOT_PUBLISHED` error if the specified tracks do not exist.
   * @category Agora Core
   */
  public subscribe(user: IAgoraRTCRemoteUser, mediaType: "audio"): Promise<IRemoteAudioTrack>;
  /**
   * Subscribes to the audio and/or video tracks of a remote user.
   *
   * ```javascript
   * await client.subscribe(user，"audio");
   * user.audioTrack.play();
   * ```
   * @param user The remote user.
   * @param mediaType The media type of the tracks to subscribe to.
   * - `"video"`: Subscribe to the video track only.
   * - `"audio"`: Subscribe to the audio track only.
   *
   * @returns When the subscription succeeds, the SDK adds the subscribed tracks to [user.audioTrack]{@link IAgoraRTCRemoteUser.audioTrack} and [user.videoTrack]{@link IAgoraRTCRemoteUser.videoTrack}. You can go on to call [audioTrack.play]{@link IRemoteAudioTrack.play} or [videoTrack.play]{@link IRemoteVideoTrack.play} to play the tracks.
   * > The `Promise` object throws the `TRACK_IS_NOT_PUBLISHED` error if the specified tracks do not exist.
   * @category Agora Core
   */
  public subscribe(user: IAgoraRTCRemoteUser, mediaType: "video" | "audio"): Promise<IRemoteTrack>;
  public subscribe(user: IAgoraRTCRemoteUser, mediaType: "video" | "audio"): Promise<IRemoteTrack> {
    if (mediaType === "audio") {
      if (!user.audioTrack) {
        const audioTrack = FakeRemoteAudioTrack.create();
        user.audioTrack = audioTrack;
        this._sideEffect.setInterval(
          () => {
            audioTrack.setVolume(randNumber({ min: 0, max: 100 }));
          },
          2000,
          String(user.uid),
        );
      }
      return Promise.resolve(user.audioTrack);
    } else {
      if (!user.videoTrack) {
        const videoTrack = FakeRemoteVideoTrack.create();
        user.videoTrack = videoTrack;
      }
      return Promise.resolve(user.videoTrack);
    }
  }

  async unsubscribe(user: IAgoraRTCRemoteUser, mediaType?: "video" | "audio" | undefined) {
    if (!mediaType || mediaType === "audio") {
      if (user.audioTrack) {
        user.audioTrack.stop();
        user.audioTrack = undefined;
        this._sideEffect.flush(String(user.uid));
      }
    }

    if (!mediaType || mediaType === "video") {
      if (user.videoTrack) {
        user.videoTrack.stop();
        user.videoTrack = undefined;
      }
    }
  }

  public massUnsubscribe(users: IAgoraRTCRemoteUser[], mediaType?: "video" | "audio" | undefined) {
    users.forEach(user => {
      this.unsubscribe(user, mediaType);
    });
  }

  public join(): Promise<UID> {
    return Promise.resolve(randUuid());
  }

  public leave(): Promise<void> {
    return Promise.resolve();
  }
}
