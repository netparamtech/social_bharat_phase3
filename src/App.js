import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import userRoutes from './user/routes';
import adminRoutes from "./admin/routes";
import ProtectedRoute from "./admin/utils/ProtectedRoute";
import UserProtectedRoute from "./user/util/UserProtectedRoute";
import { useSelector } from "react-redux";

function App() {
  return (

    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {
            userRoutes.map((route, index) => (
              <Route key={index} path={route.path}
                element={
                 ( route.path !== '/login' &&route.path !== '/' && route.path !== '/register' && route.path !== '/contact' && route.path !=='/user/block' && route.path !=='/about') ? (
                    <UserProtectedRoute element={route.component} path={route.path} />
                  ) : (
                    <route.component />
                  )
                } />
            ))
          }
          

          {
            adminRoutes.map((route, index) => (
              <Route key={index} path={route.path}
                element={
                  route.path !== '/admin' ? (
                    <ProtectedRoute element={route.component} />
                  ) : (
                    <route.component />
                  )
                } />
            ))
          }
        </Routes>
        
      </Suspense >
    </Router>
  );
}

export default App;
