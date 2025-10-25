import {createContext, useContext, useState, useEffect} from 'react';
import type {ReactNode} from 'react';

import type {User} from '@types';
import {authService} from '@services';
import {
  saveAuthToken,
  removeAuthToken,
  getAuthToken,
  saveToStorage,
  getFromStorage,
} from '@utils';
import {STORAGE_KEYS} from '@constants';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
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

  const login = async (username: string, password: string) => {
    const response = await authService.login({username, password});

    saveAuthToken(response.token);
    const userData: User = {
      username: response.username,
      token: response.token,
    };
    saveToStorage(STORAGE_KEYS.USER, userData);

    setUser(userData);
  };

  const logout = () => {
    removeAuthToken();
    saveToStorage(STORAGE_KEYS.USER, null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
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
