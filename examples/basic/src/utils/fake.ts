import { randFirstName, randNumber, seed } from "@ngneat/falso";
import type { UID } from "agora-rtc-sdk-ng";

import { appConfig } from "./const";

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

export const fakeFetch = (url: string): Promise<string> => {
  return new Promise(resolve => {
    let responseText = "";
    if (url === "/get-token") {
      responseText = JSON.stringify({
        appid: appConfig.appId,
        channel: appConfig.channel,
        token: appConfig.token,
      });
    } else {
      responseText = "404 Not Found.";
    }
    resolve(responseText);
  });
};
