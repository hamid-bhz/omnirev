import type {Contact} from '@/types/contact';
import {EmptyState, LoadingSpinner} from '@/components';
import {formatCurrency, formatDate} from '@/utils/format';

interface ContactsTableProps {
  contacts: Contact[];
  isLoading: boolean;
  onEdit: (contact: Contact) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'customer':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'potential':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'lapsed':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export function ContactsTable({
  contacts,
  isLoading,
  onEdit,
}: ContactsTableProps) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (contacts.length === 0) {
    return <EmptyState message="No contacts found" />;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
              Source
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
              Order Count
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
              Total Order Value
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase">
              Created At
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {contacts.map(contact => (
            <tr key={contact.id} className="transition-colors hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                {contact.first_name} {contact.last_name}
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap">
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium capitalize ${getStatusColor(contact.status)}`}>
                  {contact.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                {contact.source}
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                {contact.order_count}
              </td>
              <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                {formatCurrency(contact.total_order_amount)}
              </td>
              <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-700">
                {formatDate(contact.created_at)}
              </td>
              <td className="px-6 py-4 text-right text-sm whitespace-nowrap">
                <button
                  onClick={() => onEdit(contact)}
                  className="cursor-pointer font-medium text-green-600 transition-colors hover:text-green-900">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
