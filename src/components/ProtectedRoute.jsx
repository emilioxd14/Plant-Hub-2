import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePlantContext } from '../context/PlantContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = usePlantContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
