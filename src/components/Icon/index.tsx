import {
  Home,
  Users,
  LogOut,
  Menu,
  X,
  Search,
  BarChart3,
  User,
  Lock,
  Info,
  XCircle,
  Loader2,
  type LucideIcon,
} from 'lucide-react';

export type IconName =
  | 'home'
  | 'users'
  | 'logout'
  | 'menu'
  | 'close'
  | 'search'
  | 'chart'
  | 'user'
  | 'lock'
  | 'info'
  | 'alert-error'
  | 'spinner';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

const iconMap: Record<IconName, LucideIcon> = {
  home: Home,
  users: Users,
  logout: LogOut,
  menu: Menu,
  close: X,
  search: Search,
  chart: BarChart3,
  user: User,
  lock: Lock,
  info: Info,
  'alert-error': XCircle,
  spinner: Loader2,
};

export function Icon({
  name,
  size = 20,
  className = '',
  strokeWidth = 2,
}: IconProps) {
  const LucideIcon = iconMap[name];

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in icon map`);
    return null;
  }

  return (
    <LucideIcon
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
    />
  );
}
