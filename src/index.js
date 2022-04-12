import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
