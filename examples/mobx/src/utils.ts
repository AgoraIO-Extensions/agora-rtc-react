import { randFirstName, seed } from "@ngneat/falso";
import type { UID } from "agora-rtc-sdk-ng";

export const fakeName = (uid: UID): string => {
  seed(String(uid));
  const name = randFirstName();
  seed();
  return name;
};

export const fakeAvatar = (): string => {
  return "https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg";
};
