import type { AppStore } from "./stores/app.store";
declare global {
  interface Window {
    appStore: AppStore;
  }
}
