import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import userStore from "./user/store";
import adminStore from "./admin/store";
import { StyleSheetManager } from 'styled-components';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={adminStore}>
    <StyleSheetManager shouldForwardProp={(prop) => prop !== 'sortActive'}>
      <App />
    </StyleSheetManager>
  </Provider>

);
