import type { UID } from "agora-rtc-sdk-ng";

import { faker } from "@faker-js/faker";

export const fakeName = (uid: UID): string => {
  faker.seed(Number(uid));
  return faker.name.firstName();
};

export const fakeAvatar = (uid: UID): string => {
  faker.seed(Number(uid));
  const size = faker.datatype.number({ min: 200, max: 300 });
  return `http://placekitten.com/${size}/${size}`;
};
