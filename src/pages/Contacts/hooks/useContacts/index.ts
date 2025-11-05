import {useQuery} from '@tanstack/react-query';

import {contactsService} from '@/services';
import {QUERY_KEYS} from '@/constants/queryKeys';
import type {ContactFilters} from '@/types/contact';

export function useContacts(filters?: ContactFilters) {
  return useQuery({
    queryKey: QUERY_KEYS.contacts(filters),
    queryFn: () => contactsService.getContacts(filters),
    enabled: true,
  });
}

export function useContact(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.contact(id),
    queryFn: () => contactsService.getContactById(id),
    enabled: !!id,
  });
}
