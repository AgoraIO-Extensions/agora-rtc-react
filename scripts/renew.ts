// https://docs.agora.io/en/video-calling/develop/integrate-token-generation?platform=web
import dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });

import AgoraToken from "agora-token";

const { RtcRole, RtcTokenBuilder } = AgoraToken;

const { AGORA_APPID, AGORA_CERTIFICATE, AGORA_CHANNEL } = process.env;
if (!AGORA_APPID || !AGORA_CERTIFICATE || !AGORA_CHANNEL) {
  throw new Error("Missing env AGORA_APPID, AGORA_CERTIFICATE, AGORA_CHANNEL");
}

const uid = 0;
const role = RtcRole.PUBLISHER;
const expiration = 24 * 3600;

const AGORA_TOKEN = RtcTokenBuilder.buildTokenWithUid(
  AGORA_APPID,
  AGORA_CERTIFICATE,
  AGORA_CHANNEL,
  uid,
  role,
  expiration,
  expiration,
);

import fs from "fs";
import fg from "fast-glob";

const files = await fg("**/.env.local", {
  ignore: ["**/node_modules/**"],
});

const envNew = { AGORA_APPID, AGORA_CHANNEL, AGORA_TOKEN };

for (const file of files) {
  const envOld = dotenv.parse(fs.readFileSync(file));
  const mergedEnv = { ...envOld, ...envNew };
  fs.writeFileSync(
    file,
    Object.entries(mergedEnv)
      .map(([k, v]) => `${k}=${v}\n`)
      .join(""),
  );
  console.log("updated", file);
}

// ensure root .env.local
if (!files.includes(".env.local")) {
  fs.writeFileSync(
    ".env.local",
    Object.entries(envNew)
      .map(([k, v]) => `${k}=${v}\n`)
      .join(""),
  );
  console.log("created", ".env.local");
}
