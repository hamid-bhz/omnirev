import {AuthProvider} from '@/context';
import {QueryProvider} from '../QueryProvider';
import {RouterProvider} from '../RouterProvider';

export function AppProviders() {
  return (
    <QueryProvider>
      <AuthProvider>
        <RouterProvider />
      </AuthProvider>
    </QueryProvider>
  );
}
