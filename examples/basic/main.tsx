import "sanitize.css";
import "uno.css";
import AgoraRTC from "agora-rtc-react";
import { StrictMode } from "react";
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";

import App from "./src/App";
AgoraRTC.setLogLevel(/* DEBUG */ 0);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
);
