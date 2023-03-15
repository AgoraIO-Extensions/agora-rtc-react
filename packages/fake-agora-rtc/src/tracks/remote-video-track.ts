import type { IRemoteVideoTrack, VideoPlayerConfig } from "agora-rtc-sdk-ng";
import type { FakeRemoteTrackProps } from "./remote-track";

import ipadMp4 from "../../videos/ipad-2988.mp4";
import { FakeRemoteTrack } from "./remote-track";

export interface FakeRemoteVideoTrackProps extends Omit<FakeRemoteTrackProps, "trackMediaType"> {
  videoURI?: string;
}

export class FakeRemoteVideoTrack extends FakeRemoteTrack {
  public static override create(props?: FakeRemoteVideoTrackProps): IRemoteVideoTrack {
    return new FakeRemoteVideoTrack(props) as unknown as IRemoteVideoTrack;
  }

  private readonly videoURI: string;

  protected constructor({ videoURI = ipadMp4, ...props }: FakeRemoteVideoTrackProps = {}) {
    super({ ...props, trackMediaType: "video" });

    this.videoURI = videoURI;
  }
  /**
   * Plays a remote video track on the web page.
   *
   * @param element Specifies a DOM element. The SDK will create a `<video>` element under the specified DOM element to play the video track. You can specify a DOM element in either of following ways:
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
      this._videoEl.style.objectFit = "cover";
      this._videoEl.loop = true;
      this._videoEl.muted = true;
    }

    this._videoEl.src = this.videoURI;
    this._videoEl.style.opacity = "1";

    if (container) {
      container.appendChild(this._videoEl);
    }

    if (this._videoEl) {
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
