import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';

const UserProtectedRoute = ({ element: Component, path }) => {
  const isAuthenticated = useSelector((state) => state.userAuth.isAuthenticated && state.userAuth.token !== null);
  const user = useSelector((state) => state.userAuth);
  const isPasswordSet = useSelector((state) => state.userAuth.user?.is_password_set && state.userAuth.token !== null);


  // Check if the route path is "/set-password"
  if (path === "/set-password") {
    if (isAuthenticated) {
      // User is authenticated, allow access to the set password route.
      return <Component />;
    } else {
      // User is not authenticated, redirect to the login page.
      return <Navigate to="/login" />;
    }
  } else {
    if (isAuthenticated) {
      if (isPasswordSet || path === "/dashboard") {
        if (path === '/login') {
          return <HomePage />
        }
        // User is authenticated, and either the password is set or the route is "/dashboard".
        return <Component />;
      } else {
        // User is authenticated, but password is not set, redirect to the set password route.
        return <Navigate to="/set-password" />;
      }
    } else {
      // User is not authenticated, redirect to the login page.
      return <Navigate to="/login" />;
    }
  }

};

export default UserProtectedRoute;
