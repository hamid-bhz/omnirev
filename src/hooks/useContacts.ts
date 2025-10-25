import {useQuery} from '@tanstack/react-query';

import {contactsService} from '@services';
import type {ContactFilters} from '@types';

export function useContacts(filters?: ContactFilters) {
  return useQuery({
    queryKey: ['contacts', filters],
    queryFn: () => contactsService.getContacts(filters),
    enabled: true,
  });
}

export function useContact(id: string) {
  return useQuery({
    queryKey: ['contact', id],
    queryFn: () => contactsService.getContactById(id),
    enabled: !!id,
  });
}
