import CryptoJS from "crypto-js";

let appId = import.meta.env.AGORA_APPID;
if (import.meta.env.AGORA_AES_SALT) {
  // only for github-pages demo
  const bytes = CryptoJS.AES.decrypt(import.meta.env.AGORA_APPID, import.meta.env.AGORA_AES_SALT);
  appId = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

const appConfig = {
  appId: appId,
  channel: import.meta.env.AGORA_CHANNEL,
  token: import.meta.env.AGORA_TOKEN ? import.meta.env.AGORA_TOKEN : null,
};

export { appConfig };
