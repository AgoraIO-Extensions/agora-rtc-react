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
