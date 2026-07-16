import type { FC, ReactNode } from 'react';
import AuthService from '../../services/AuthService';
import { Navigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: FC<Props> = ({ children, requireAdmin = false }) => {
  const token = AuthService.getToken();
  if (!token) return <Navigate to="/" replace />;
  if (requireAdmin) {
    const roles = AuthService.getRoles();
    if (!roles || !roles.includes('ADMIN')) return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
