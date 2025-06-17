// components/ProtectedRoute.tsx

import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import React from 'react';

export const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: ('admin' | 'user')[];
}) => {
  const { token, role } = useAuthStore();

  if (!token || !role) return <Navigate to='/signin' replace />;
  if (!allowedRoles.includes(role))
    return <Navigate to='/unauthorized' replace />;
  return <>{children}</>;
};
