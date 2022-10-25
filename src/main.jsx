import "./index.css";
import App from "./App";
import Modal from "./components/Modal";
import React from "react";
import ReactDOM from "react-dom/client";
import StoreProvider from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
      <Modal />
    </StoreProvider>
  </React.StrictMode>
);
