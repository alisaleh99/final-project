import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobleContext from "./GlobleContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobleContext>
      <App />
    </GlobleContext>
  </React.StrictMode>
);
