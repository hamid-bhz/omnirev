import type {ChartData} from '@/types/chart';
import type {CategoryStats} from '@/types/dashboard';
import {CATEGORY_COLORS} from '@/constants/categories';

export function transformCategoryStats(
  stats: CategoryStats | undefined
): ChartData[] {
  if (!stats) return [];

  return Object.entries(stats).map(([name, percentage]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value: parseFloat(percentage.replace('%', '')),
    color: CATEGORY_COLORS[name] || '#9CA3AF',
  }));
}
