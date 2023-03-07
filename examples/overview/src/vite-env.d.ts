/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly AGORA_APPID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
