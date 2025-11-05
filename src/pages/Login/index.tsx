import type {AxiosError} from 'axios';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import type {ChangeEvent, FormEvent} from 'react';

import {useLogin} from './hooks';
import {useAuth} from '@/context';
import {STORAGE_KEYS} from '@/constants/storage';
import {Button, Input, Icon} from '@/components';
import type {AuthResponse, User} from '@/types/auth';
import {saveAuthToken, saveToStorage} from '@/utils/storage';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const loginMutation = useLogin(onLoginSuccess);
  const {isAuthenticated, isLoading: authLoading, setUser} = useAuth();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/dashboard', {replace: true});
    }
  }, [isAuthenticated, authLoading, navigate]);

  function onLoginSuccess(response: AuthResponse) {
    saveAuthToken(response.token);
    const userData: User = {
      username: response.username,
      token: response.token,
    };
    saveToStorage(STORAGE_KEYS.USER, userData);

    setUser(userData);
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-green-50 to-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
          <div className="text-lg font-medium text-gray-700">Loading...</div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate({username, password});
  };

  const error = loginMutation.error
    ? (loginMutation.error as AxiosError<{error: string}>).response?.data
        ?.error || 'Login failed. Please try again.'
    : '';

  return (
    <div className="flex min-h-screen">
      <div className="hidden flex-col justify-between bg-linear-to-br from-green-600 via-green-700 to-emerald-800 p-12 text-white lg:flex lg:w-1/2">
        <div>
          <h1 className="text-4xl font-bold">OmniRev</h1>
          <p className="mt-2 text-green-100">
            Customer Relationship Management
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                <Icon name="chart" size={24} />
              </div>
              <div>
                <h3 className="font-semibold">Powerful Analytics</h3>
                <p className="mt-1 text-sm text-green-100">
                  Track customer insights and revenue metrics in real-time
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                <Icon name="users" size={24} />
              </div>
              <div>
                <h3 className="font-semibold">Contact Management</h3>
                <p className="mt-1 text-sm text-green-100">
                  Organize and manage customer relationships effortlessly
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                <Icon name="lock" size={24} />
              </div>
              <div>
                <h3 className="font-semibold">Secure & Reliable</h3>
                <p className="mt-1 text-sm text-green-100">
                  Enterprise-grade security for your business data
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-green-100">
          © 2025 OmniRev. All rights reserved.
        </div>
      </div>

      <div className="flex w-full items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 px-4 py-12 sm:px-6 lg:w-1/2 lg:px-20 xl:px-24">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <h1 className="text-3xl font-bold text-green-600">OmniRev</h1>
            <p className="mt-1 text-sm text-gray-600">
              Customer Relationship Management
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-xl shadow-gray-200/50">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
              <p className="mt-2 text-sm text-gray-600">
                Sign in to access your dashboard
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input
                label="Username"
                type="text"
                value={username}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
                required
                placeholder="Enter your username"
                autoComplete="username"
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                required
                placeholder="Enter your password"
                autoComplete="current-password"
              />

              {error && (
                <div className="animate-shake rounded-lg border border-red-200 bg-red-50 p-4">
                  <div className="flex items-center">
                    <Icon
                      name="alert-error"
                      size={20}
                      className="mr-2 text-red-400"
                    />
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              )}

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-start">
                  <Icon
                    name="info"
                    size={20}
                    className="mt-0.5 mr-2 text-blue-400"
                  />
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      Demo Credentials
                    </p>
                    <p className="mt-1 text-xs text-blue-700">
                      Username:{' '}
                      <span className="font-semibold">any username</span>
                      <br />
                      Password: <span className="font-semibold">11111</span>
                    </p>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loginMutation.isPending}>
                {loginMutation.isPending ? (
                  <span className="flex items-center justify-center">
                    <Icon
                      name="spinner"
                      size={16}
                      className="mr-2 animate-spin"
                    />
                    Signing in...
                  </span>
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
