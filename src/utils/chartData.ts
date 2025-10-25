import type {CategoryStats} from '@types';

export interface ChartData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

const CATEGORY_COLORS: Record<string, string> = {
  art: '#FF6B6B',
  legal: '#FEE7C0',
  education: '#4ECDC4',
  financial: '#5B7FFF',
  unknown: '#FDB8B8',
};

/**
 * Transform category stats API response to chart data format
 */
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
