export const useAuth = () => {
  return {
    user: null,
    login: async () => {},
    logout: () => {},
    isAuthenticated: false,
  };
};
