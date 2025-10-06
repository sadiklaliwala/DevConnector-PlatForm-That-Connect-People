import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  const auth = useSelector(state => state.auth);
  
  // Debug logs
  console.log('🔐 PrivateRoute - isAuthenticated:', auth.isAuthenticated);
  console.log('👤 PrivateRoute - user:', auth.user);
  
  if (!auth.isAuthenticated) {
    console.log('❌ Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  console.log('✅ Authenticated, rendering component');
  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default PrivateRoute;