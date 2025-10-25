import {format} from 'date-fns';

/**
 * Format a number as USD currency
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format a date string to a friendly format
 * Example: "Aug 23, 12:30 pm"
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    return format(date, 'MMM dd, h:mm a');
  } catch {
    return '-';
  }
};

/**
 * Format a date to ISO 8601 format for API
 */
export const formatDateISO = (date: Date): string => {
  return date.toISOString();
};

/**
 * Combine first and last name
 */
export const formatFullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`.trim();
};
