import {useState} from 'react';
import {
  useContacts,
  useMarkets,
  useContactFilters,
  useUpdateContact,
} from '@hooks';
import {
  ContactsTable,
  ContactsFilters,
  EditContactModal,
  Pagination,
} from '@components';
import type {Contact} from '@types';

export default function Contacts() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    filters,
    apiFilters,
    setPage,
    setPerPage,
    setSearchQuery,
    setStatus,
    setSource,
    setCategory,
    setMarket,
    setStartDate,
    setEndDate,
    clearFilters,
  } = useContactFilters();

  const {data: markets = [], isLoading: isLoadingMarkets} = useMarkets();
  const {data: contactsData, isLoading: isLoadingContacts} =
    useContacts(apiFilters);

  const updateContactMutation = useUpdateContact();

  const handleEdit = (contact: Contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleSave = async (id: string, data: Partial<Contact>) => {
    await updateContactMutation.mutateAsync({id, data});
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  const contacts = contactsData?.data || [];
  const pagination = contactsData?.pagination || {
    page: 1,
    per_page: 10,
    total: 0,
    total_pages: 0,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Contacts
            {pagination.total > 0 && (
              <span className="ml-2 text-lg font-normal text-gray-500">
                ({pagination.total})
              </span>
            )}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage and view all your contacts
          </p>
        </div>
      </div>

      <ContactsFilters
        searchQuery={filters.q}
        status={filters.status}
        source={filters.source}
        category={filters.category}
        market={filters.market}
        startDate={filters.startDate}
        endDate={filters.endDate}
        markets={markets}
        isLoadingMarkets={isLoadingMarkets}
        onSearchChange={setSearchQuery}
        onStatusChange={setStatus}
        onSourceChange={setSource}
        onCategoryChange={setCategory}
        onMarketChange={setMarket}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onClearFilters={clearFilters}
      />

      <ContactsTable
        contacts={contacts}
        isLoading={isLoadingContacts}
        onEdit={handleEdit}
      />

      {!isLoadingContacts && contacts.length > 0 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.total_pages}
          totalItems={pagination.total}
          itemsPerPage={pagination.per_page}
          onPageChange={setPage}
          onItemsPerPageChange={setPerPage}
        />
      )}

      <EditContactModal
        isOpen={isModalOpen}
        contact={selectedContact}
        markets={markets}
        onClose={handleCloseModal}
        onSave={handleSave}
        isSaving={updateContactMutation.isPending}
      />
    </div>
  );
}
