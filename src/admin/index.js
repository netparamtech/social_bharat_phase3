import React from 'react';
import {createRoot} from "react-dom/client";
import AdminApp from './AdminApp';
 
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<AdminApp />)