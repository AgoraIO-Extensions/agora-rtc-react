import { randFirstName, seed } from "@ngneat/falso";
import type { UID } from "agora-rtc-react";

import { appConfig } from "./const";

export const fakeName = (uid: UID): string => {
  seed(String(uid));
  const name = randFirstName();
  seed();
  return name;
};

export const fakeAvatar = (): string => {
  return "https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg";
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
