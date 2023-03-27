import { loadEnv, loadSecrets, buildToken, writeEnv } from "../../../scripts/renew";
import path from "node:path";

main();

function main() {
  const pkgDir = path.join(__dirname, "..");
  const rootEnv = loadEnv(path.join(__dirname, "..", "..", ".."));
  const pkgEnv = loadEnv(pkgDir);

  const secrets = loadSecrets(rootEnv, pkgEnv);
  if (!secrets) return;

  const { AGORA_APPID, AGORA_CERTIFICATE } = secrets;

  const newEnv = Array(10)
    .fill(0)
    .reduce(
      (acc, _, i) => {
        const AGORA_CHANNEL = `test${i}`;
        const AGORA_TOKEN = buildToken(AGORA_APPID, AGORA_CERTIFICATE, AGORA_CHANNEL);
        acc[`AGORA_CHANNEL_${i}`] = AGORA_CHANNEL;
        acc[`AGORA_TOKEN_${i}`] = AGORA_TOKEN;
        return acc;
      },
      { ...pkgEnv, AGORA_APPID },
    );

  writeEnv(pkgDir, newEnv);
}
