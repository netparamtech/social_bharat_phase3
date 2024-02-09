import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import userStore from "./user/store";
import adminStore from "./admin/store";
import { StyleSheetManager } from 'styled-components';
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={adminStore}>
      <StyleSheetManager shouldForwardProp={(prop) => prop !== 'sortActive'}>
        <HelmetProvider>
          <App />
          {/* Same as */}
          <ToastContainer />
        </HelmetProvider>
      </StyleSheetManager>
    </Provider>
    <ToastContainer
      position="top-right"
      autoClose={10000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      bodyClassName="toast-body"
    />
  </React.StrictMode>

);
