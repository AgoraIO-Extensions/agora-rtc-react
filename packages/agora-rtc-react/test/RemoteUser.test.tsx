import { randUuid } from "@ngneat/falso";
import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import { FakeRTCClient } from "fake-agora-rtc";
import { describe, expect, test } from "vitest";

import { RemoteUser } from "../src/components";
import * as stories from "../src/components/RemoteUser.stories";
import { AgoraRTCProvider } from "../src/hooks";
const { Overview, WithCover, WithControls } = composeStories(stories);

describe("RemoteUser component", () => {
  test("renders without crashing", () => {
    const { container } = render(
      <AgoraRTCProvider client={FakeRTCClient.create()}>
        <RemoteUser />
      </AgoraRTCProvider>,
    );
    expect(container).toBeInTheDocument();
  });

  test("sets user", () => {
    const user = {
      uid: randUuid(),
      hasVideo: true,
      hasAudio: true,
    };
    const { container } = render(
      <AgoraRTCProvider client={FakeRTCClient.create()}>
        <RemoteUser cover={"test"} user={user} />
      </AgoraRTCProvider>,
    );
    expect(container).toBeInTheDocument();
    expect(container.querySelector("img")?.getAttribute("src")).toBeUndefined();
  });

  test("sets user but hasVideo is false", () => {
    const user = {
      uid: randUuid(),
      hasVideo: false,
      hasAudio: true,
    };
    const { container } = render(
      <AgoraRTCProvider client={FakeRTCClient.create()}>
        <RemoteUser cover={"test"} user={user} />
      </AgoraRTCProvider>,
    );
    expect(container).toBeInTheDocument();
    expect(container.querySelector("img")?.getAttribute("src")).toBe("test");
  });
});

describe("RemoteUser component stories", () => {
  test("renders Overview stories", () => {
    const { container } = render(<Overview />);
    expect(container.querySelector("div")?.style.width).toBe("288px");
    expect(container.querySelector("div")?.style.height).toBe("216px");
  });

  test("renders WithCover stories", () => {
    const { container } = render(<WithCover />);
    expect(container.querySelector("img")?.getAttribute("src")).toBe(
      "http://placekitten.com/200/200",
    );
  });

  test("renders WithControls stories", () => {
    const { container } = render(<WithControls />);
    expect(container.querySelector(".arr-user-control")).toBeInTheDocument();
  });
});
