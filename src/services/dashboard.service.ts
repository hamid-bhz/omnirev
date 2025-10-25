import type {CategoryStats, Market, Category} from '@types';
import {apiClient} from './api';

export const dashboardService = {
  /**
   * Get category statistics
   */
  getCategoryStats: async (): Promise<CategoryStats> => {
    const response = await apiClient.get<CategoryStats>('/categories/stats');
    return response.data;
  },

  /**
   * Get list of available markets
   */
  getMarkets: async (): Promise<Market[]> => {
    const response = await apiClient.get<Market[]>('/markets');
    return response.data;
  },

  /**
   * Get list of available categories
   */
  getCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get<Category[]>('/categories');
    return response.data;
  },
};
