import {NavLink} from 'react-router-dom';

import {Icon} from '@/components';
import type {IconName} from '@/components';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  path: string;
  icon: IconName;
}

export function Sidebar({isOpen, onClose}: SidebarProps) {
  const navItems: NavItem[] = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: 'home',
    },
    {
      name: 'Contacts',
      path: '/contacts',
      icon: 'users',
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-xl transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:translate-x-0 lg:shadow-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
            <h1 className="text-xl font-bold text-green-600">OmniRev</h1>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 lg:hidden">
              <Icon name="close" size={20} />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => onClose()}
                className={({isActive}) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }>
                <Icon name={item.icon} size={20} />
                {item.name}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-gray-200 p-4">
            <p className="text-xs text-gray-500">© 2025 OmniRev</p>
          </div>
        </div>
      </aside>
    </>
  );
}
