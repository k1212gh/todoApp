// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals"; // 없으면 제거
import "./index.css"; // CSS 필요하다면
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* StrictMode는 개발 중 배포 시 제거할 수도 있음 */}
    <App />
  </React.StrictMode>
);

reportWebVitals(); // 없으면 제거
