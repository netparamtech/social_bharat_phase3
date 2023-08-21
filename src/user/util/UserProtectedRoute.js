import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const UserProtectedRoute = ({ element: Component }) => {
  const isAuthenticated = useSelector((state) => state.userAuth.isAuthenticated && state.userAuth.token !== null);

  if (isAuthenticated) {
    return <Component />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default UserProtectedRoute;
