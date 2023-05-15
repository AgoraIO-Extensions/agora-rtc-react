// https://docs.agora.io/en/video-calling/develop/integrate-token-generation?platform=web

import fs from "node:fs";
import path from "node:path";

import AgoraToken from "agora-token";
import dotenv from "dotenv";
import minimist from "minimist";

const { RtcRole, RtcTokenBuilder } = AgoraToken;
const argv = minimist(process.argv.slice(2));

if (argv.write) {
  main();
}

function main() {
  const rootEnv = loadEnv(path.join(__dirname, ".."));
  const pkgEnv = loadEnv(process.cwd());

  const secrets = loadSecrets(rootEnv, pkgEnv);
  if (!secrets) return;

  const { AGORA_APPID, AGORA_CERTIFICATE } = secrets;

  const AGORA_CHANNEL = pkgEnv.AGORA_CHANNEL || rootEnv.AGORA_CHANNEL || "test";

  const AGORA_TOKEN = buildToken(AGORA_APPID, AGORA_CERTIFICATE, AGORA_CHANNEL);

  writeEnv(process.cwd(), { ...pkgEnv, AGORA_APPID, AGORA_CHANNEL, AGORA_TOKEN });
}

export function loadSecrets(...variables: dotenv.DotenvParseOutput[]) {
  const { AGORA_APPID, AGORA_CERTIFICATE } = process.env;
  if (AGORA_APPID && AGORA_CERTIFICATE) {
    return { AGORA_APPID, AGORA_CERTIFICATE };
  }
  for (let i = variables.length - 1; i >= 0; i--) {
    const { AGORA_APPID, AGORA_CERTIFICATE } = variables[i];
    if (AGORA_APPID && AGORA_CERTIFICATE) {
      return { AGORA_APPID, AGORA_CERTIFICATE };
    }
  }
  if (!variables[0].AGORA_CERTIFICATE) {
    console.log("Missing env AGORA_CERTIFICATE. Token renew skipped.");
    return;
  }
  if (!variables[0].AGORA_APPID) {
    console.log("Missing env AGORA_APPID. Token renew skipped.");
    return;
  }
}

export function buildToken(
  AGORA_APPID: string,
  AGORA_CERTIFICATE: string,
  AGORA_CHANNEL: string,
): string {
  const uid = 0;
  const role = RtcRole.PUBLISHER;
  const expiration = 25 * 3600;

  const AGORA_TOKEN = RtcTokenBuilder.buildTokenWithUid(
    AGORA_APPID,
    AGORA_CERTIFICATE,
    AGORA_CHANNEL,
    uid,
    role,
    expiration,
    expiration,
  );

  return AGORA_TOKEN;
}

export function loadEnv(envDir: string) {
  try {
    return dotenv.parse(fs.readFileSync(path.join(envDir, ".env.local")));
  } catch {
    return {};
  }
}

export function writeEnv(envDir: string, data: Record<string, string>) {
  const file = path.join(envDir, ".env.local");
  fs.writeFileSync(
    file,
    Object.entries(data)
      .map(([k, v]) => `${k}=${v}\n`)
      .join(""),
  );
  console.log("Updated", file);
}
