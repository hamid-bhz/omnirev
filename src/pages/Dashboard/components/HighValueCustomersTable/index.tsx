import {LoadingSpinner, EmptyState} from '@/components';

interface Customer {
  name: string;
  sales: number;
}

interface HighValueCustomersTableProps {
  customers: Customer[];
  isLoading: boolean;
}

export function HighValueCustomersTable({
  customers,
  isLoading,
}: HighValueCustomersTableProps) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (customers.length === 0) {
    return <EmptyState message="No customers found" />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="pb-3 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
              Name
            </th>
            <th className="pb-3 text-right text-xs font-semibold tracking-wider text-gray-500 uppercase">
              Sales
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {customers.map((customer, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-3 text-sm text-gray-900">{customer.name}</td>
              <td className="py-3 text-right text-sm font-medium text-gray-900">
                $
                {customer.sales.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
