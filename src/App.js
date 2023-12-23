import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, useEffect } from "react";
import userRoutes from './user/routes';
import adminRoutes from "./admin/routes";
import ProtectedRoute from "./admin/utils/ProtectedRoute";
import UserProtectedRoute from "./user/util/UserProtectedRoute";
import { useSelector } from "react-redux";
import { Spin } from "antd";

function App() {

  const isLoading = useSelector((state) => state.loader.isLoaderSet);

  return (
    <div className="">

      <Router>
        <Suspense fallback={<div>Loading...</div>}>
        <Spin spinning={isLoading}>
          <Routes>
            {
              userRoutes.map((route, index) => (
                <Route key={index} path={route.path}
                  element={
                    (route.path !== '/login' && route.path !== '/:name' && route.path !== '/' && route.path !== '/register' && route.path !== '/contact' && route.path !== '/user/block' && route.path !== '/about' && route.path !=='/social-bharat-provides') ? (
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
</Spin>
        </Suspense >
      </Router>

    </div>


  );
}

export default App;