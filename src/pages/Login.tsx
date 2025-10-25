import type {FormEvent} from 'react';
import type {AxiosError} from 'axios';
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import {useAuth} from '@context';
import {Button, Input} from '@components';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {login, isAuthenticated, isLoading: authLoading} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/dashboard', {replace: true});
    }
  }, [isAuthenticated, authLoading, navigate]);

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      const axiosError = err as AxiosError<{error: string}>;
      setError(
        axiosError.response?.data?.error || 'Login failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

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
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
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
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
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
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
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
                onChange={e => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
                autoComplete="username"
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                autoComplete="current-password"
              />

              {error && (
                <div className="animate-shake rounded-lg border border-red-200 bg-red-50 p-4">
                  <div className="flex items-center">
                    <svg
                      className="mr-2 h-5 w-5 text-red-400"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                </div>
              )}

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-start">
                  <svg
                    className="mt-0.5 mr-2 h-5 w-5 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
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
                disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="mr-2 h-4 w-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
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
