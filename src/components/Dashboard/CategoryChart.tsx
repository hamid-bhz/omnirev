import {
  Pie,
  Cell,
  PieChart,
  ResponsiveContainer,
  type PieLabelRenderProps,
} from 'recharts';

import EmptyState from './EmptyState';
import LoadingSpinner from './LoadingSpinner';

interface ChartData {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

interface CategoryChartProps {
  data: ChartData[];
  isLoading: boolean;
}

export default function CategoryChart({data, isLoading}: CategoryChartProps) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (data.length === 0) {
    return <EmptyState message="No data available" />;
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
      <div className="flex-1">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(props: PieLabelRenderProps) => {
                const percent = Number(props.percent ?? 0);
                return `${(percent * 100).toFixed(1)}%`;
              }}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="shrink-0 space-y-2">
        {data.map((category, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{backgroundColor: category.color}}
            />
            <span className="text-sm text-gray-700">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
