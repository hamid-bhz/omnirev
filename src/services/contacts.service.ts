import type {Contact, ContactsResponse, ContactFilters} from '@types';
import {apiClient} from './api';

export const contactsService = {
  /**
   * Get list of contacts with filters and pagination
   */
  getContacts: async (filters?: ContactFilters): Promise<ContactsResponse> => {
    const response = await apiClient.get<ContactsResponse>('/contacts', {
      params: filters,
    });
    return response.data;
  },

  /**
   * Get a single contact by ID
   */
  getContactById: async (id: string): Promise<Contact> => {
    const response = await apiClient.get<Contact>(`/contacts/${id}`);
    return response.data;
  },

  /**
   * Update a contact
   */
  updateContact: async (
    id: string,
    data: Partial<Contact>
  ): Promise<Contact> => {
    const response = await apiClient.put<Contact>(`/contacts/${id}`, data);
    return response.data;
  },
};
