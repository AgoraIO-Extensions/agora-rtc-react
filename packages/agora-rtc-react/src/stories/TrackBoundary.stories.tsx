import { randUuid } from "@ngneat/falso";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";
import type { IAgoraRTCRemoteUser, ITrack } from "agora-rtc-sdk-ng";
import { FakeRTCClient } from "agora-rtc-sdk-ng-fake";
import { useState } from "react";

import { RemoteUser, TrackBoundary } from "../components";
import { AgoraRTCProvider } from "../hooks";

interface Controls {
  direction: "row" | "column";
  show: boolean;
}

const meta: Meta = {
  title: "Tools/TrackBoundary",
  component: TrackBoundary,
  argTypes: {
    direction: {
      name: "Layout Direction",
      description: "[Demo Only] Horizontal or vertical layout",
      table: {
        defaultValue: { summary: "row" },
      },
      type: "string",
      options: ["row", "column"],
      control: { type: "select" },
    },
    show: {
      name: "Show",
      description: "[Demo Only] Show or hide the entire component",
      table: {
        defaultValue: { summary: "true" },
      },
      type: "boolean",
      control: { type: "boolean" },
    },
  },
  args: {
    direction: "row",
    show: true,
  },
  decorators: [
    Story => {
      const [client] = useState(() =>
        FakeRTCClient.create(client => {
          const subscribe = client.subscribe.bind(client);
          return {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            subscribe: async (user, mediaType: any): Promise<any> => {
              const track = await subscribe(user, mediaType);
              logTrackStop(track, () =>
                action(`${mediaType === "audio" ? "AudioTrack" : "VideoTrack"}.stop()`)(user.uid),
              );
              return track;
            },
          };
        }),
      );

      return <AgoraRTCProvider client={client}>{Story()}</AgoraRTCProvider>;
    },
  ],
};

export default meta;

export const LayoutSwitchWithTrackBoundary: StoryObj<Controls> = {
  parameters: {
    docs: {
      description: {
        story:
          "With TrackBoundary, Track Players will not trigger `track.stop()` on unmount. Tracks will be stopped if inactive or TrackBoundary unmounts.",
      },
    },
  },
  render: function LayoutSwitchWithTrackBoundary({ direction, show }) {
    const [users] = useState<IAgoraRTCRemoteUser[]>(() => [
      { uid: randUuid(), hasVideo: true, hasAudio: true },
      { uid: randUuid(), hasVideo: true, hasAudio: true },
    ]);

    return show ? (
      <TrackBoundary>
        <div style={{ display: "flex", gap: 8, flexDirection: direction }}>
          {users.map(user => (
            <RemoteUser key={direction + user.uid} playAudio playVideo user={user} />
          ))}
        </div>
      </TrackBoundary>
    ) : (
      <></>
    );
  },
};

export const LayoutSwitchWithoutTrackBoundary: StoryObj<Controls> = {
  parameters: {
    docs: {
      description: {
        story: "Without TrackBoundary, Track Players will trigger `track.stop()` on unmount.",
      },
    },
  },
  render: function LayoutSwitchWithoutTrackBoundary({ direction, show }) {
    const [users] = useState<IAgoraRTCRemoteUser[]>(() => [
      { uid: randUuid(), hasVideo: true, hasAudio: true },
      { uid: randUuid(), hasVideo: true, hasAudio: true },
    ]);

    return show ? (
      <div style={{ display: "flex", gap: 8, flexDirection: direction }}>
        {users.map(user => (
          <RemoteUser key={direction + user.uid} playAudio playVideo user={user} />
        ))}
      </div>
    ) : (
      <></>
    );
  },
};

function logTrackStop(track: ITrack, onStop: () => void) {
  const realStop = track.stop;
  track.stop = function stop() {
    onStop();
    realStop.call(this);
  };
}
