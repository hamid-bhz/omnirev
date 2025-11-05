import {apiClient} from './api';
import type {CategoryStats} from '@/types/dashboard';
import type {Category, Market} from '@/types/common';

export const dashboardService = {
  getCategoryStats: async (): Promise<CategoryStats> => {
    const response = await apiClient.get<CategoryStats>('/categories/stats');
    return response.data;
  },
  getMarkets: async (): Promise<Market[]> => {
    const response = await apiClient.get<Market[]>('/markets');
    return response.data;
  },
  getCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>('/categories');
    return response.data;
  },
};
