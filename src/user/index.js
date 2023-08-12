import React from 'react';
import {createRoot} from "react-dom/client";
import UserApp from './UserApp';
 
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(<UserApp />)