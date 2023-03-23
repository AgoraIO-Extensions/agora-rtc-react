// https://docs.agora.io/en/video-calling/develop/integrate-token-generation?platform=web

import AgoraToken from "agora-token";
import dotenv from "dotenv";
import minimist from "minimist";
import path from "node:path";
import fs from "node:fs";

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

function loadSecrets(rootEnv: dotenv.DotenvParseOutput, pkgEnv: dotenv.DotenvParseOutput) {
  const pkgEnvConfigured = Boolean(pkgEnv.AGORA_APPID && pkgEnv.AGORA_CERTIFICATE);

  const AGORA_CERTIFICATE = pkgEnvConfigured ? pkgEnv.AGORA_CERTIFICATE : rootEnv.AGORA_CERTIFICATE;
  if (!AGORA_CERTIFICATE) {
    console.log("Missing env AGORA_CERTIFICATE. Token renew skipped.");
    return;
  }

  const AGORA_APPID = pkgEnvConfigured ? pkgEnv.AGORA_APPID : rootEnv.AGORA_APPID;
  if (!AGORA_APPID) {
    console.log("Missing env AGORA_APPID. Token renew skipped.");
    return;
  }

  return { AGORA_APPID, AGORA_CERTIFICATE };
}

function buildToken(AGORA_APPID: string, AGORA_CERTIFICATE: string, AGORA_CHANNEL: string): string {
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

  return AGORA_TOKEN;
}

function loadEnv(envDir: string) {
  try {
    return dotenv.parse(fs.readFileSync(path.join(envDir, ".env.local")));
  } catch {
    return {};
  }
}

function writeEnv(envDir: string, data: Record<string, string>) {
  const file = path.join(envDir, ".env.local");
  fs.writeFileSync(
    file,
    Object.entries(data)
      .map(([k, v]) => `${k}=${v}\n`)
      .join(""),
  );
  console.log("Updated", file);
}
