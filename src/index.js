import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import adminStore from "./admin/store";
import { StyleSheetManager } from 'styled-components';
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={adminStore}>
    <StyleSheetManager >
      <HelmetProvider>
        <ToastContainer />
        <App />
        {/* Same as */}
      </HelmetProvider>
    </StyleSheetManager>
  </Provider>
);
