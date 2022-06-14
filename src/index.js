import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { SongsContextProvider } from "./context/SongsContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <SongsContextProvider>
    <App />
  </SongsContextProvider>
  // </React.StrictMode>
);
