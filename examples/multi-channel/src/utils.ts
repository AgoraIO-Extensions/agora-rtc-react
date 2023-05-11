import type { UID } from "agora-rtc-sdk-ng";

import { randNumber, randFirstName, seed } from "@ngneat/falso";

export const fakeName = (uid: UID): string => {
  seed(String(uid));
  const name = randFirstName();
  seed();
  return name;
};

export const fakeAvatar = (uid: UID): string => {
  seed(String(uid));
  const size = randNumber({ min: 200, max: 300 });
  seed();
  return `http://placekitten.com/${size}/${size}`;
};

export function getAgoraTokens() {
  return [
    {
      channel: import.meta.env.AGORA_CHANNEL_0 || "test0",
      token: import.meta.env.AGORA_TOKEN_0,
    },
    {
      channel: import.meta.env.AGORA_CHANNEL_1 || "test1",
      token: import.meta.env.AGORA_TOKEN_1,
    },
    {
      channel: import.meta.env.AGORA_CHANNEL_2 || "test2",
      token: import.meta.env.AGORA_TOKEN_2,
    },
    {
      channel: import.meta.env.AGORA_CHANNEL_3 || "test3",
      token: import.meta.env.AGORA_TOKEN_3,
    },
    {
      channel: import.meta.env.AGORA_CHANNEL_4 || "test4",
      token: import.meta.env.AGORA_TOKEN_4,
    },
    {
      channel: import.meta.env.AGORA_CHANNEL_5 || "test5",
      token: import.meta.env.AGORA_TOKEN_5,
    },
    {
      channel: import.meta.env.AGORA_CHANNEL_6 || "test6",
      token: import.meta.env.AGORA_TOKEN_6,
    },
    {
      channel: import.meta.env.AGORA_CHANNEL_7 || "test7",
      token: import.meta.env.AGORA_TOKEN_7,
    },
    {
      channel: import.meta.env.AGORA_CHANNEL_8 || "test8",
      token: import.meta.env.AGORA_TOKEN_8,
    },
    {
      channel: import.meta.env.AGORA_CHANNEL_9 || "test9",
      token: import.meta.env.AGORA_TOKEN_9,
    },
  ];
}
