import {Icon} from '@/components';
import {useAuth} from '@/context';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({onMenuClick}: HeaderProps) {
  const {user, logout} = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
            aria-label="Open menu">
            <Icon name="menu" size={24} />
          </button>

          <div className="flex items-center lg:hidden">
            <h1 className="text-xl font-bold text-green-600">Omnirev</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-3 sm:flex">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {user?.username}
              </p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">
              <span className="text-sm font-semibold">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

          <button
            onClick={logout}
            className="cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-gray-100"
            aria-label="Logout">
            <Icon name="logout" size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
