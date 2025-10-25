import {Outlet} from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <Outlet />
      </div>
    </div>
  );
}
