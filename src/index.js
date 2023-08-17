import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import userStore from "./user/store";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <Provider store = {userStore}>
      <App />
    </Provider>
);
