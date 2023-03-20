import { observer } from "mobx-react-lite";
import { appStore } from "./store";

import "agora-rtc-react/dist/agora-rtc-react.css";
import { Room } from "./Room";

const appId = import.meta.env.AGORA_APPID;
const channel = import.meta.env.AGORA_CHANNEL;
const token = import.meta.env.AGORA_TOKEN;

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
      <div>
        <button
          disabled={appStore.connectionState !== "DISCONNECTED"}
          onClick={() => appStore.join(appId, channel, token)}
        >
          JOIN
        </button>
        &nbsp;
        <button
          disabled={appStore.connectionState !== "CONNECTED"}
          onClick={() => appStore.leave()}
        >
          LEAVE
        </button>
        &nbsp;
        {appStore.uid && <samp>[UID={appStore.uid}]</samp>}
      </div>
      {appStore.client && <Room client={appStore.client} />}
    </div>
  );
});
