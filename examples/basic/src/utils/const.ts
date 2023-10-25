import type { UID } from "agora-rtc-react";
import CryptoJS from "crypto-js";

let appId = import.meta.env.AGORA_APPID;
const ShareScreenUID: UID = 10;

if (import.meta.env.AGORA_AES_SALT) {
  // only for github-pages demo
  const bytes = CryptoJS.AES.decrypt(import.meta.env.AGORA_APPID, import.meta.env.AGORA_AES_SALT);
  appId = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

const appConfig = {
  appId: appId,
  channel: import.meta.env.AGORA_CHANNEL || "test",
  token: import.meta.env.AGORA_TOKEN ? import.meta.env.AGORA_TOKEN : null,
  ShareScreenUID: ShareScreenUID,
};

function getAgoraTokens() {
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

export { appConfig, getAgoraTokens };
