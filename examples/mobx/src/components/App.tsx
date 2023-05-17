import { AgoraRTCProvider } from "agora-rtc-react";
import { observer } from "mobx-react-lite";

import { appStore } from "../stores/app.store";

import { Home } from "./Home";
import { Room } from "./Room";

export const App = observer(function App() {
  return (
    <>
      <Home />
      {appStore.client && (
        <AgoraRTCProvider client={appStore.client}>
          <Room />
        </AgoraRTCProvider>
      )}
    </>
  );
});
