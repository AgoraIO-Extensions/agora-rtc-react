import type { ILocalAudioTrack } from "agora-rtc-sdk-ng";
import type { FakeLocalTrackProps } from "./local-track";

import keyboardMp3 from "../../videos/quick-mechanical-keyboard-14391.mp3";
import { FakeLocalTrack } from "./local-track";
import { hideProperties } from "../utils";

export interface FakeLocalAudioTrackProps extends Omit<FakeLocalTrackProps, "trackMediaType"> {
  audioURI?: string;
  /** 0~100 */
  volume?: number;
}

export class FakeLocalAudioTrack extends FakeLocalTrack {
  public static override create(props?: FakeLocalAudioTrackProps): ILocalAudioTrack {
    return new FakeLocalAudioTrack(props) as unknown as ILocalAudioTrack;
  }

  private readonly _audioURI: string;

  protected constructor({
    audioURI = keyboardMp3,
    volume = 100,
    ...props
  }: FakeLocalAudioTrackProps = {}) {
    super({ ...props, trackMediaType: "audio" });
    this._volume = Math.max(0, Math.min(100, volume));
    this._audioURI = audioURI;

    hideProperties(this, "_audioEl", "_volume", "_audioURI");
  }
  /**
   * Plays a local audio track on the web page.
   *
   * @param element Specifies a DOM element. The SDK will create a `<audio>` element under the specified DOM element to play the audio track. You can specify a DOM element in either of the following ways:
   * - `string`: Specify the ID of the DOM element.
   * - `HTMLElement`: Pass a DOM object.
   * @param config Sets the playback configurations, such as display mode and mirror mode. See [[AudioPlayerConfig]]. By default, the SDK enables mirror mode for a local audio track.
   */
  public override play(): void {
    if (!this._audioEl) {
      this._audioEl = document.createElement("audio");
      this._audioEl.loop = true;
      document.body.appendChild(this._audioEl);
    }

    this._audioEl.src = this._audioURI;
    this._audioEl.muted = this.muted;
    this._audioEl.volume = this._volume / 100;

    if (this.enabled && this._audioEl) {
      this.isPlaying = true;
      this._audioEl.play();
    }
  }
  /**
   * Stops playing the media track.
   */
  public override stop(): void {
    if (this.isPlaying && this._audioEl) {
      this.isPlaying = false;
      this._audioEl.pause();
    }
  }
  /**
   * Sends or stops sending the media data of the track.
   *
   * **Since**
   * <br>&emsp;&emsp;&emsp;*4.6.0*
   *
   * If the track is published, a successful call of `setMuted(true)` triggers the [user-unpublished]{@link IAgoraRTCClient.event_user_unpublished} event on the remote client, and a successful call of `setMuted(false)` triggers the [user-published]{@link IAgoraRTCClient.event_user_published} event.
   *
   * > - Calling `setMuted(true)` does not stop capturing audio or audio and takes shorter time to take effect than [[setEnabled]]. For details, see [What are the differences between setEnabled and setMuted?](https://docs.agora.io/en/Interactive%20Broadcast/faq/differences_between_setenabled_and_setmuted).
   * > - Do not call `setEnabled` and `setMuted` together.
   *
   * @param muted Whether to stop sending the media data of the track:
   * - `true`: Stop sending the media data of the track.
   * - `false`: Resume sending the media data of the track.
   */
  public override async setMuted(muted: boolean): Promise<void> {
    super.setMuted(muted);
    if (this._audioEl) {
      this._audioEl.muted = muted;
    }
  }
  /**
   * Sets the volume of a local audio track.
   *
   * @param volume The volume. The value ranges from 0 (mute) to 1000 (maximum). A value of 100 is the original volume。 The volume change may not be obvious to human ear. If local track has been published, setting volume will affect the volume heard by remote users.
   */
  public setVolume(volume: number): void {
    volume = Math.max(0, Math.min(100, volume));
    if (this._volume !== volume) {
      this._volume = volume;
      if (this._audioEl) {
        this._audioEl.volume = volume / 100;
      }
    }
  }
  /**
   * Gets the audio level of a local audio track.
   *
   * @returns The audio level. The value range is [0,1]. 1 is the highest audio level.
   * Usually a user with audio level above 0.6 is a speaking user.
   *
   */
  public getVolumeLevel(): number {
    return this._volume / 100;
  }
  /**
   * **Since**
   * <br>&emsp;&emsp;&emsp;*4.1.0*
   *
   * > Note:
   * > - As of v4.7.0, this method no longer takes effect. Use IRemoteAudioTrack.setPlaybackDevice() instead.
   * > - This method supports Chrome on desktop devices only. Other browsers throw a '`NOT_SUPPORTED` error when calling this method.
   *
   * Sets the playback device (speaker) for the remote audio stream.
   *
   * @param deviceId The device ID, which can be retrieved by calling [[getPlaybackDevices]].
   */
  public async setPlaybackDevice(deviceId: string): Promise<void> {
    console.log("[FakeLocalAudioTrack]: setPlaybackDevice", deviceId);
  }

  private _audioEl?: HTMLAudioElement;
  private _volume: number;
}
