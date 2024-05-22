import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';

const UserProtectedRoute = ({ element: Component, path }) => {
  const user = useSelector(state => state.userAuth);
  const isAuthenticated = user?.isAuthenticated;
  const isPasswordSet = user?.user?.is_password_set;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (path === "/set-password" && isAuthenticated) {
    return <Component />;
  }

  if (isPasswordSet || path === "/dashboard") {
    return path === '/login' ? <HomePage /> : <Component />;
  }

  return <Navigate to="/set-password" />;
};

export default UserProtectedRoute;
