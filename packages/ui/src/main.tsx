import React from "react";
import ReactDOM from "react-dom/client";
import "./shared/styles/globals.css";
import { PlayerProvider } from "./store/playerStore";
import App, { ErrorBoundary } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <PlayerProvider>
        <App />
      </PlayerProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
