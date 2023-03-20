import { observer } from "mobx-react-lite";
import { appStore } from "../stores/app.store";

import "agora-rtc-react/dist/agora-rtc-react.css";
import { AgoraRTCProvider } from "agora-rtc-react";
import { JoinLeave } from "./JoinLeave";
import { Room } from "./Room";

export const App = observer(function App() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        padding: 8,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <JoinLeave />
      {appStore.client && (
        <AgoraRTCProvider client={appStore.client}>
          <Room />
        </AgoraRTCProvider>
      )}
    </div>
  );
});
