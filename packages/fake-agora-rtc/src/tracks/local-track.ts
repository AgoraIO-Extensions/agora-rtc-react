import { randProductDescription } from "@ngneat/falso";
import type { ILocalTrack, LocalAudioTrackStats, LocalVideoTrackStats } from "agora-rtc-sdk-ng";

import { hideProperties } from "../utils";

import type { FakeTrackProps } from "./track";
import { FakeTrack } from "./track";

export interface FakeLocalTrackProps extends FakeTrackProps {
  /** track label */
  label?: string;
  enabled?: boolean;
  muted?: boolean;
}

export class FakeLocalTrack extends FakeTrack {
  public static override create(props?: FakeLocalTrackProps): ILocalTrack {
    return new FakeLocalTrack(props) as unknown as ILocalTrack;
  }

  protected _label: string;

  protected constructor({
    label = randProductDescription(),
    enabled = true,
    muted = false,
    ...trackProps
  }: FakeLocalTrackProps = {}) {
    super(trackProps);
    this._label = label;
    this.enabled = enabled;
    this.muted = muted;

    hideProperties(this, "_label");
  }
  /**
   * **Since**
   * <br>&emsp;&emsp;&emsp;*4.0.0*
   *
   * Enables/Disables the track.
   *
   * After a track is disabled, the SDK stops playing and publishing the track.
   *
   * > - Disabling a track does not trigger the [LocalTrack.on("track-ended")]{@link event_track_ended} event.
   * > - If a track is published, disabling this track triggers the [user-unpublished]{@link IAgoraRTCClient.event_user_unpublished} event on the remote client, and re-enabling this track triggers the [user-published]{@link IAgoraRTCClient.event_user_published} event.
   * > - Do not call `setEnabled` and `setMuted` together.
   *
   * @param enabled Whether to enable the track:
   * - `true`: Enable the track.
   * - `false`: Disable the track.
   */
  public async setEnabled(enabled: boolean): Promise<void> {
    if (enabled !== this.enabled) {
      this.enabled = enabled;
      if (enabled) {
        this.play();
      } else {
        this.stop();
      }
    }
  }
  /**
   * **DEPRECATED** from v4.1.0. Use [AgoraRTCClient.getLocalVideoStats]{@link IAgoraRTCClient.getLocalVideoStats} and [AgoraRTCClient.getLocalAudioStats]{@link IAgoraRTCClient.getLocalAudioStats} instead.
   *
   * Gets the statistics of a local track.
   *
   * > Note: When getting the statistics of a local video track, you cannot get the `encodeDelay` property on iOS.
   */
  public getStats(): LocalVideoTrackStats | LocalAudioTrackStats {
    throw new Error("Method not implemented.");
  }
  /**
   * Gets the label of a local track.
   *
   * @return The label that the SDK returns may include:
   * - The [MediaDeviceInfo.label](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo/label) property, if the track is created by calling `createMicrophoneAudioTrack` or `createCameraVideoTrack`.
   * - The `sourceId` property, if the track is created by calling `createScreenVideoTrack`.
   * - The [MediaStreamTrack.label](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/label) property, if the track is created by calling `createCustomAudioTrack` or `createCustomVideoTrack`.
   */
  public getTrackLabel(): string {
    return this._label;
  }
  /**
   * Sends or stops sending the media data of the track.
   *
   * **Since**
   * <br>&emsp;&emsp;&emsp;*4.6.0*
   *
   * If the track is published, a successful call of `setMuted(true)` triggers the [user-unpublished]{@link IAgoraRTCClient.event_user_unpublished} event on the remote client, and a successful call of `setMuted(false)` triggers the [user-published]{@link IAgoraRTCClient.event_user_published} event.
   *
   * > - Calling `setMuted(true)` does not stop capturing audio or video and takes shorter time to take effect than [[setEnabled]]. For details, see [What are the differences between setEnabled and setMuted?](https://docs.agora.io/en/Interactive%20Broadcast/faq/differences_between_setenabled_and_setmuted).
   * > - Do not call `setEnabled` and `setMuted` together.
   *
   * @param muted Whether to stop sending the media data of the track:
   * - `true`: Stop sending the media data of the track.
   * - `false`: Resume sending the media data of the track.
   */
  public async setMuted(muted: boolean): Promise<void> {
    this.muted = muted;
  }
  /**
   * Closes a local track and releases the audio and video resources that it occupies.
   *
   * Once you close a local track, you can no longer reuse it.
   */
  public close(): void {
    this.stop();
  }

  public muted: boolean;

  public enabled: boolean;
}
