import type { Meta, StoryObj } from "@storybook/react";
import type { IAgoraRTCRemoteUser, ITrack } from "agora-rtc-sdk-ng";

import { randUuid } from "@ngneat/falso";
import { action } from "@storybook/addon-actions";
import { createFakeRtcClient, FakeRemoteAudioTrack, FakeRemoteVideoTrack } from "fake-agora-rtc";
import { useState } from "react";
import { RemoteUser } from "../components";
import { AgoraRTCProvider, TrackBoundary } from "../hooks";

function logTrackStop(track: ITrack, onStop: () => void) {
  const realStop = track.stop;
  track.stop = function stop() {
    onStop();
    realStop.call(this);
  };
}

interface DirectionSwitchProps {
  direction: "row" | "column";
  onChange: (direction: "row" | "column") => void;
}

function DirectionSwitch({ direction, onChange }: DirectionSwitchProps) {
  return (
    <div style={{ padding: "4px 0" }}>
      <label>
        <input
          type="checkbox"
          checked={direction === "row"}
          onChange={ev => onChange(ev.target.checked ? "row" : "column")}
        />
        <span>Switch Layout</span>
      </label>
    </div>
  );
}

const meta: Meta = {
  title: "Recipes/TrackBoundary",
  tags: ["autodocs"],
  decorators: [
    Story => {
      const [client] = useState(() =>
        createFakeRtcClient({
          subscribe: async (user, mediaType): Promise<any> => {
            if (mediaType === "audio") {
              const audioTrack = FakeRemoteAudioTrack.create();
              user.audioTrack = audioTrack;
              logTrackStop(audioTrack, () => action("AudioTrack.stop()")(user.uid));
              return audioTrack;
            } else {
              const videoTrack = FakeRemoteVideoTrack.create();
              user.videoTrack = videoTrack;
              logTrackStop(videoTrack, () => action("VideoTrack.stop()")(user.uid));
              return videoTrack;
            }
          },
          unsubscribe: async () => void 0,
        }),
      );

      return <AgoraRTCProvider client={client}>{Story()}</AgoraRTCProvider>;
    },
  ],
};

export default meta;

export const LayoutSwitchWithTrackBoundary: StoryObj = {
  render: function LayoutSwitchWithTrackBoundary() {
    const [users] = useState<IAgoraRTCRemoteUser[]>(() => [
      { uid: randUuid(), hasVideo: true, hasAudio: true },
      { uid: randUuid(), hasVideo: true, hasAudio: true },
    ]);

    const [direction, setDirection] = useState<"row" | "column">("row");

    return (
      <div>
        <DirectionSwitch direction={direction} onChange={setDirection} />
        <TrackBoundary>
          <div style={{ display: "flex", gap: 8, flexDirection: direction }}>
            {users.map(user => (
              <RemoteUser key={direction + user.uid} playAudio playVideo user={user} />
            ))}
          </div>
        </TrackBoundary>
      </div>
    );
  },
};

export const LayoutSwitchWithoutTrackBoundary: StoryObj = {
  render: function LayoutSwitchWithoutTrackBoundary() {
    const [users] = useState<IAgoraRTCRemoteUser[]>(() => [
      { uid: randUuid(), hasVideo: true, hasAudio: true },
      { uid: randUuid(), hasVideo: true, hasAudio: true },
    ]);

    const [direction, setDirection] = useState<"row" | "column">("row");

    return (
      <div>
        <DirectionSwitch direction={direction} onChange={setDirection} />
        <div style={{ display: "flex", gap: 8, flexDirection: direction }}>
          {users.map(user => (
            <RemoteUser key={direction + user.uid} playAudio playVideo user={user} />
          ))}
        </div>
      </div>
    );
  },
};
