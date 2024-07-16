import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';

const ProtectedRoute = ({ element: Component, path }) => {
  const user = useSelector(state => state.auth);
  const isAuthenticated = user?.isAuthenticated && user?.token !== null;

  if (user === null) {
    return <LoginPage />;
  }
  if (isAuthenticated === null) {
    // Show loading spinner or placeholder until authentication status is determined
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log(path);
    return <Navigate to="/admin" />;
  }
  if (isAuthenticated) {
    if (path !== '/admin') {
      return <Component />;
    }
    return <DashboardPage />;
  }
};

export default ProtectedRoute;
