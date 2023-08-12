import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense } from "react";

import userRoutes from './user/routes';
import adminRoutes from "./admin/routes";

function App() {
  return (
    
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          {/* <Routes>
            {
              userRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={<route.component />} />
              ))
            }
          </Routes> */}
        
          <Routes>
            {
              adminRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={<route.component />} />
              ))
            }
          </Routes>
      </Suspense >
    </Router>
  );
}

export default App;
