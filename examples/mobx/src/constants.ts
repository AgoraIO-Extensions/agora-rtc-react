import CryptoJS from "crypto-js";

let id = import.meta.env.AGORA_APPID;
if (import.meta.env.AGORA_AES_SALT) {
  // only for github-pages demo
  const bytes = CryptoJS.AES.decrypt(import.meta.env.AGORA_APPID, import.meta.env.AGORA_AES_SALT);
  id = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
export const appId = id;
export const channel = import.meta.env.AGORA_CHANNEL || "test";
export const token = import.meta.env.AGORA_TOKEN ? import.meta.env.AGORA_TOKEN : null;
