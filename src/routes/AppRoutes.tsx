import {lazy} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import {ProtectedRoute} from '@/components';
import {MainLayout} from '@/layouts/MainLayout';

const Login = lazy(() => import('@/pages/Login'));
const Contacts = lazy(() => import('@/pages/Contacts'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="contacts" element={<Contacts />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
