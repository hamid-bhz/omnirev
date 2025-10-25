import {useAuth} from '@context';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({onMenuClick}: HeaderProps) {
  const {user, logout} = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
            aria-label="Open menu">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
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
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
