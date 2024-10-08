import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import adminRoutes from "./admin/routes";
import ProtectedRoute from "./admin/utils/ProtectedRoute";
import UserProtectedRoute from "./user/util/UserProtectedRoute";
import UserRoutes from "./user/UserRoutes";
import { logout } from "./user/actions/userAction";
import NotFound from "./NotFound";
import CreateCurrentJobPage from "./user/pages/CreateCurrentJobPage";
import UpdateCurrentOpeningPage from "./user/pages/UpdateCurrentOpeningPage";

const LazyUserRoutes = React.lazy(() => import("./user/UserRoutes"));

function App() {
  const isLoading = useSelector((state) => state.loader.isLoaderSet);
  const user = useSelector((state) => state.userAuth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [haveJobPermission, setHaveJobPermission] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      if (user.token !== null) {
        if (new Date(user.token.expire_at) < new Date()) {
          dispatch(logout());
        } else {
          setIsAdmin(user.user.is_admin);
        }
      } else {
        dispatch(logout());
      }
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (isAdmin) {
      setHaveJobPermission(user.user.permissions && user.user.permissions.have_job_permission);
    }
  }, [isAdmin, user]);

  return (
    <div className="">
      <Router>
        <Suspense fallback={<div>loading...</div>}>
          <Spin spinning={isLoading}>
            <Routes>
              {UserRoutes().map((route, index) => (
                <Route
                  key={`user-route-${index}`}
                  path={route.path}
                  element={
                    (route.path !== '/login' && route.path !== '/:name' && route.path !== '/' && route.path !== '/register' && route.path !== '/contact' && route.path !== '/user/block' && route.path !== '/about' && route.path !== '/social-bharat-provides') ? (
                      <UserProtectedRoute element={route.component} path={route.path} />
                    ) : (
                      <route.component />
                    )
                  }
                />
              ))}
              <Route key="lazy-user-routes" path="/" element={<LazyUserRoutes />} />
              {adminRoutes.map((route, index) => (
                <Route
                  key={`admin-route-${index}`}
                  path={route.path}
                  element={<ProtectedRoute element={route.component} path={route.path} />}
                />
              ))}
              {isAdmin ? (
                haveJobPermission && (
                  <>
                    <Route key="create-current-job" path="/user/create/current-job" element={<CreateCurrentJobPage />} />
                    <Route key="update-current-job" path="/user/update/current-job/:id" element={<UpdateCurrentOpeningPage />} />
                  </>
                )
              ) : (
                <Route key="not-found" path="/*" element={<NotFound />} />
              )}
            </Routes>
          </Spin>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
