import {STORAGE_KEYS} from '@constants';

/**
 * Save data to localStorage
 */
export const saveToStorage = <T>(key: string, value: T): void => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

/**
 * Get data from localStorage
 */
export const getFromStorage = <T>(key: string): T | null => {
  try {
    const serialized = localStorage.getItem(key);
    if (serialized === null) {
      return null;
    }
    return JSON.parse(serialized) as T;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

/**
 * Remove data from localStorage
 */
export const removeFromStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

/**
 * Clear all app data from localStorage
 */
export const clearStorage = (): void => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

/**
 * Get auth token from storage
 */
export const getAuthToken = (): string | null => {
  return getFromStorage<string>(STORAGE_KEYS.AUTH_TOKEN);
};

/**
 * Save auth token to storage
 */
export const saveAuthToken = (token: string): void => {
  saveToStorage(STORAGE_KEYS.AUTH_TOKEN, token);
};

/**
 * Remove auth token from storage
 */
export const removeAuthToken = (): void => {
  removeFromStorage(STORAGE_KEYS.AUTH_TOKEN);
};
