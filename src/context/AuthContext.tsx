import type {ReactNode} from 'react';
import {createContext, useContext, useState, useEffect} from 'react';

import type {User} from '@/types/auth';
import {STORAGE_KEYS} from '@/constants/storage';
import {
  getAuthToken,
  getFromStorage,
  removeAuthToken,
  saveToStorage,
} from '@/utils/storage';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    const savedUser = getFromStorage<User>(STORAGE_KEYS.USER);

    if (token && savedUser) {
      setUser(savedUser);
    }

    setIsLoading(false);
  }, []);

  const logout = () => {
    removeAuthToken();
    saveToStorage(STORAGE_KEYS.USER, null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    logout,
    setUser,
    isAuthenticated: !!user,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
