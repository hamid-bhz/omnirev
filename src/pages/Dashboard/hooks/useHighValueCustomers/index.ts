import {useQuery} from '@tanstack/react-query';

import {contactsService} from '@/services';

import {QUERY_KEYS} from '@/constants/queryKeys';
import type {ContactFilters, ContactsResponse} from '@/types/contact';

export interface HighValueCustomer {
  name: string;
  sales: number;
}

export function useHighValueCustomers(filters?: ContactFilters) {
  return useQuery({
    queryKey: QUERY_KEYS.highValueCustomers(filters),
    queryFn: () => contactsService.getContacts(filters),
    select: (data: ContactsResponse) => {
      if (!data?.data) return [];

      return data.data.map(contact => ({
        name: `${contact.first_name} ${contact.last_name}`,
        sales: contact.total_order_amount,
      }));
    },
  });
}
