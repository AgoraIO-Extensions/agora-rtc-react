import type { ITrack } from "agora-rtc-sdk-ng";

import { faker } from "@faker-js/faker";
import { FakeAgoraEventEmitter } from "../eventemitter";
import { hideProperties } from "../utils";

export interface FakeTrackProps {
  trackMediaType?: "audio" | "video";
  trackId?: string;
}

export class FakeTrack extends FakeAgoraEventEmitter {
  public static create(props?: FakeTrackProps): ITrack {
    return new FakeTrack(props) as unknown as ITrack;
  }

  private readonly _trackId: string;

  protected constructor({
    trackMediaType = "video",
    trackId = faker.datatype.uuid(),
  }: FakeTrackProps = {}) {
    super();

    this.trackMediaType = trackMediaType;
    this._trackId = trackId;

    hideProperties(this, "_trackId");
  }

  /**
   * The type of a media track:
   * - `"audio"`: Audio track.
   * - `"video"`: Video track.
   */
  public trackMediaType: "audio" | "video";
  /**
   * Whether a media track is playing on the webpage:
   * - `true`: The media track is playing on the webpage.
   * - `false`: The media track is not playing on the webpage.
   */
  public isPlaying = false;
  /**
   * Gets the ID of a media track, a unique identifier generated by the SDK.
   *
   * @return The media track ID.
   */
  public getTrackId(): string {
    return this._trackId;
  }
  /**
   * Gets an [MediaStreamTrack](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack) object.
   *
   * @return An [MediaStreamTrack](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack) object.
   */
  public getMediaStreamTrack(): MediaStreamTrack {
    throw new Error("Method not implemented.");
  }
  /**
   * Plays a media track on the webpage.
   *
   * @param element Specifies a DOM element. The SDK will create a `<video>` element under the specified DOM element to play the video track. You can specify a DOM element in either of following ways:
   * - `string`: Specify the ID of the DOM element.
   * - `HTMLElement`: Pass a DOM object.
   */
  public play(element?: string | HTMLElement): void {
    this.isPlaying = true;
    console.log("[FakeTrack]: play", element);
  }

  /**
   * Stops playing the media track.
   */
  public stop(): void {
    this.isPlaying = false;
  }
}
