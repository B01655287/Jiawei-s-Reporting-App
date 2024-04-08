import React from "react";
import ReactDOM from "react-dom/client";
import { history, IHistoryRouter } from "./router/history";
import App from "./App";
import { registerSW } from "virtual:pwa-register";
import { ConfigProvider } from "antd-mobile";
import enUS from "antd-mobile/es/locales/en-US";

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    alert("App ready to work offline");
    console.log("offline ready");
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <IHistoryRouter history={history}>
      <ConfigProvider locale={enUS}>
        <App />
      </ConfigProvider>
    </IHistoryRouter>
  </React.StrictMode>
);
