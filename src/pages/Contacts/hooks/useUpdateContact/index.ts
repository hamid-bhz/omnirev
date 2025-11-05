import {useMutation, useQueryClient} from '@tanstack/react-query';

import {contactsService} from '@/services';
import type {Contact} from '@/types/contact';
import {QUERY_KEYS} from '@/constants/queryKeys';

export function useUpdateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Contact>;
    }): Promise<Contact> => contactsService.updateContact(id, data),
    onSuccess: () => {
      // Invalidate all contact-related queries to refresh the data
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.contacts()});
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.highValueCustomers(),
      });
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.categoryStats()});
    },
  });
}
