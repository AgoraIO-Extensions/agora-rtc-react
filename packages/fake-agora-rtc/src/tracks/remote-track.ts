import type {
  IRemoteTrack,
  RemoteAudioTrackStats,
  RemoteVideoTrackStats,
  UID,
} from "agora-rtc-sdk-ng";
import type { FakeTrackProps } from "./track";

import { faker } from "@faker-js/faker";
import { FakeTrack } from "./track";

export interface FakeRemoteTrackProps extends FakeTrackProps {
  /** track label */
  uid?: UID;
}

export class FakeRemoteTrack extends FakeTrack {
  public static override create(props?: FakeRemoteTrackProps): IRemoteTrack {
    return new FakeRemoteTrack(props) as unknown as IRemoteTrack;
  }

  protected _uid: UID;

  protected constructor({ uid = faker.datatype.uuid(), ...trackProps }: FakeRemoteTrackProps = {}) {
    super(trackProps);
    this._uid = uid;
  }
  /**
   * Gets the `uid` of the remote user who publishes the remote track.
   *
   * @return The `uid` of the remote user.
   */
  public getUserId(): UID {
    return this._uid;
  }
  /**
   * Gets the statistics of a remote track.
   *
   * **DEPRECATED** from v4.1.0. Use [AgoraRTCClient.getRemoteVideoStats]{@link IAgoraRTCClient.getRemoteVideoStats} and [AgoraRTCClient.getRemoteAudioStats]{@link IAgoraRTCClient.getRemoteAudioStats} instead.
   * @return An [[RemoteAudioTrackStats]] or [[RemoteVideoTrackStats]] object.
   */
  getStats(): RemoteAudioTrackStats | RemoteVideoTrackStats {
    throw new Error("Method not implemented.");
  }
}
