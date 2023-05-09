const appConfig = {
  appId: import.meta.env.AGORA_APPID,
  channel: import.meta.env.AGORA_CHANNEL,
  token: import.meta.env.AGORA_TOKEN ? import.meta.env.AGORA_TOKEN : null,
};

export { appConfig };
