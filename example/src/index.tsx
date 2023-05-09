import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import React from 'react';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
