import type { IRemoteAudioTrack } from "agora-rtc-sdk-ng";
import type { FakeRemoteTrackProps } from "./remote-track";

import keyboardMp3 from "../../videos/quick-mechanical-keyboard-14391.mp3";
import { FakeRemoteTrack } from "./remote-track";
import { hideProperties } from "../utils";

export interface FakeRemoteAudioTrackProps extends Omit<FakeRemoteTrackProps, "trackMediaType"> {
  audioURI?: string;
  /** 0~100 */
  volume?: number;
}

export class FakeRemoteAudioTrack extends FakeRemoteTrack {
  public static override create(props?: FakeRemoteAudioTrackProps): IRemoteAudioTrack {
    return new FakeRemoteAudioTrack(props) as unknown as IRemoteAudioTrack;
  }

  private readonly _audioURI: string;

  public override valueOf(): string {
    return "valueOf";
  }

  public override toString(): string {
    return "toString";
  }

  public toJSON(): string {
    return "toJSON";
  }

  protected constructor({
    audioURI = keyboardMp3,
    volume = 100,
    ...props
  }: FakeRemoteAudioTrackProps = {}) {
    super({ ...props, trackMediaType: "audio" });
    this._volume = Math.max(0, Math.min(100, volume));
    this._audioURI = audioURI;

    hideProperties(this, "_audioEl", "_volume", "_audioURI");
  }
  /**
   * Plays a remote audio track.
   *
   * > When playing the audio track, you do not need to pass any DOM element.
   */
  public override play(): void {
    if (!this._audioEl) {
      this._audioEl = document.createElement("audio");
      this._audioEl.loop = true;
      document.body.appendChild(this._audioEl);
    }

    this._audioEl.src = this._audioURI;
    this._audioEl.volume = this._volume / 100;

    if (this._audioEl) {
      this.isPlaying = true;
      this._audioEl.play().catch(console.log);
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
   * Sets the volume of a remote audio track.
   *
   * @param volume The volume. The value ranges from 0 (mute) to 100 (maximum). A value of 100 is the current volume.
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
   * Gets the audio level of a remote audio track.
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
   * Sets the audio playback device, for example, the speaker.
   *
   * > This method supports Chrome on desktop devices only. Other browsers throw a `NOT_SUPPORTED` error when calling this method.
   * @param deviceId Device ID, which can be retrieved by calling [[getPlaybackDevices]].
   */
  public async setPlaybackDevice(deviceId: string): Promise<void> {
    console.log("[FakeRemoteAudioTrack]: setPlaybackDevice", deviceId);
  }

  private _audioEl?: HTMLAudioElement;
  private _volume: number;
}

console.log(Object.keys(FakeRemoteAudioTrack.create()));
