import {Navigate} from 'react-router-dom';
import type {ReactNode} from 'react';

import {useAuth} from '@/context';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({children}: ProtectedRouteProps) {
  const {isAuthenticated, isLoading} = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
