import {useMutation, useQueryClient} from '@tanstack/react-query';

import type {Contact} from '@types';
import {contactsService} from '@services';

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
      queryClient.invalidateQueries({queryKey: ['contacts']});
      queryClient.invalidateQueries({queryKey: ['highValueCustomers']});
    },
  });
}
