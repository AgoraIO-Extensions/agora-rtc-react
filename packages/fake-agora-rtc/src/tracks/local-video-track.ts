import type { ILocalVideoTrack, VideoPlayerConfig } from "agora-rtc-sdk-ng";
import type { FakeLocalTrackProps } from "./local-track";

import ipadMp4 from "../../videos/ipad-1988.mp4";
import { FakeLocalTrackImpl } from "./local-track";

export interface FakeLocalVideoTrackProps extends Omit<FakeLocalTrackProps, "trackMediaType"> {
  videoURI?: string;
}

export class FakeLocalVideoTrackImpl extends FakeLocalTrackImpl {
  private readonly videoURI: string;

  public constructor({ videoURI = ipadMp4, ...props }: FakeLocalVideoTrackProps = {}) {
    super({ ...props, trackMediaType: "video" });

    this.videoURI = videoURI;
  }
  /**
   * Plays a local video track on the web page.
   *
   * @param element Specifies a DOM element. The SDK will create a `<video>` element under the specified DOM element to play the video track. You can specify a DOM element in either of the following ways:
   * - `string`: Specify the ID of the DOM element.
   * - `HTMLElement`: Pass a DOM object.
   * @param config Sets the playback configurations, such as display mode and mirror mode. See [[VideoPlayerConfig]]. By default, the SDK enables mirror mode for a local video track.
   */
  public override play(element: string | HTMLElement, config?: VideoPlayerConfig): void {
    this._config = config;

    const container = typeof element === "string" ? document.getElementById(element) : element;

    if (!this._videoEl) {
      this._videoEl = document.createElement("video");
      this._videoEl.loop = true;
      this._videoEl.muted = true;
    }

    this._videoEl.src = this.videoURI;

    if (container) {
      container.appendChild(this._videoEl);
    }

    if (this.enabled && this._videoEl) {
      this.isPlaying = true;
      this._videoEl.play();
    }
  }
  /**
   * Stops playing the media track.
   */
  public override stop(): void {
    if (this.isPlaying && this._videoEl) {
      this.isPlaying = false;
      this._videoEl.pause();
    }
  }

  protected _config?: VideoPlayerConfig;
  protected _videoEl?: HTMLVideoElement;
}

export const FakeLocalVideoTrack = FakeLocalVideoTrackImpl as unknown as ILocalVideoTrack;
