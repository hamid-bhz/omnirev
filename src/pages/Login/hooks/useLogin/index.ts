import {useMutation} from '@tanstack/react-query';

import {authService} from '@/services';
import type {LoginCredentials, AuthResponse} from '@/types/auth';

export function useLogin(onSuccess: (data: AuthResponse) => void) {
  return useMutation({
    mutationFn: (credentials: LoginCredentials): Promise<AuthResponse> =>
      authService.login(credentials),
    retry: false,
    onSuccess: onSuccess,
  });
}
