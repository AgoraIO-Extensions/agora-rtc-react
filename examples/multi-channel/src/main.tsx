import "sanitize.css";
import "uno.css";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { StrictMode } from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
