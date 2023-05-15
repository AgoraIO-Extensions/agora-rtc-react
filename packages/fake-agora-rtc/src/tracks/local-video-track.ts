import type { ILocalVideoTrack, VideoPlayerConfig } from "agora-rtc-sdk-ng";

import ipadMp4 from "../../videos/ipad-2988.mp4";
import { hideProperties } from "../utils";

import type { FakeLocalTrackProps } from "./local-track";
import { FakeLocalTrack } from "./local-track";

export interface FakeLocalVideoTrackProps extends Omit<FakeLocalTrackProps, "trackMediaType"> {
  videoURI?: string;
}

export class FakeLocalVideoTrack extends FakeLocalTrack {
  public static override create(props?: FakeLocalVideoTrackProps): ILocalVideoTrack {
    return new FakeLocalVideoTrack(props) as unknown as ILocalVideoTrack;
  }

  private readonly _videoURI: string;

  protected constructor({ videoURI = ipadMp4, ...props }: FakeLocalVideoTrackProps = {}) {
    super({ ...props, trackMediaType: "video" });

    this._videoURI = videoURI;

    hideProperties(this, "_config", "_videoEl", "_videoURI");
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
      this._videoEl.style.width = "100%";
      this._videoEl.style.height = "100%";
      this._videoEl.loop = true;
      this._videoEl.muted = true;
    }

    this._videoEl.src = this._videoURI;
    this._videoEl.style.objectFit = this._config?.fit || "cover";
    this._videoEl.style.opacity = "1";

    if (container) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.appendChild(this._videoEl);
    }

    if (this.enabled && this._videoEl) {
      this.isPlaying = true;
      this._videoEl.play().catch(console.log);
    }
  }
  /**
   * Stops playing the media track.
   */
  public override stop(): void {
    if (this.isPlaying && this._videoEl) {
      this.isPlaying = false;
      this._videoEl.style.opacity = "0";
      this._videoEl.pause();
    }
  }

  protected _config?: VideoPlayerConfig;
  protected _videoEl?: HTMLVideoElement;
}
