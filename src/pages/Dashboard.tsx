import {
  useMarkets,
  useCategoryStats,
  useDashboardFilters,
  useHighValueCustomers,
} from '@hooks';
import {
  CategoryChart,
  DashboardFilters,
  HighValueCustomersTable,
} from '@components';

export default function Dashboard() {
  const {
    filters,
    setEndDate,
    setStartDate,
    setActiveFilter,
    setSelectedMarket,
    contactFilters,
  } = useDashboardFilters();

  const {data: markets = [], isLoading: isLoadingMarkets} = useMarkets();
  const {data: categoryData = [], isLoading: isLoadingStats} =
    useCategoryStats();

  const {
    data: highValueCustomers = [],
    isLoading: isLoadingCustomers,
    error: customersError,
  } = useHighValueCustomers(contactFilters);

  return (
    <div className="space-y-6">
      {customersError && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-800">
          Failed to load dashboard data
        </div>
      )}

      <DashboardFilters
        activeFilter={filters.activeFilter}
        onFilterChange={setActiveFilter}
        startDate={filters.startDate}
        endDate={filters.endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        selectedMarket={filters.selectedMarket}
        onMarketChange={setSelectedMarket}
        markets={markets}
        isLoadingMarkets={isLoadingMarkets}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Companies
          </h2>
          <CategoryChart data={categoryData} isLoading={isLoadingStats} />
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            High-Value Customers
          </h2>
          <HighValueCustomersTable
            customers={highValueCustomers}
            isLoading={isLoadingCustomers}
          />
        </div>
      </div>
    </div>
  );
}
