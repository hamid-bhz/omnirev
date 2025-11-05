import {apiClient} from './api';
import type {Contact, ContactsResponse, ContactFilters} from '@/types/contact';

export const contactsService = {
  getContacts: async (filters?: ContactFilters): Promise<ContactsResponse> => {
    const response = await apiClient.get<ContactsResponse>('/contacts', {
      params: filters,
    });
    return response.data;
  },
  getContactById: async (id: string): Promise<Contact> => {
    const response = await apiClient.get<Contact>(`/contacts/${id}`);
    return response.data;
  },
  updateContact: async (
    id: string,
    data: Partial<Contact>
  ): Promise<Contact> => {
    const response = await apiClient.put<Contact>(`/contacts/${id}`, data);
    return response.data;
  },
};
