// ? Types
import { LocalStorageKeys } from '@/types/global';

export const useLocalStorage = () => {
  const setItem = (key: LocalStorageKeys, value: string): void => {
    localStorage.setItem(key, value);
  };

  const getItem = (key: LocalStorageKeys): string | null => {
    return localStorage.getItem(key);
  };

  const removeItem = (key: LocalStorageKeys) => {
    localStorage.removeItem(key);
  };

  const clearAllItems = (): void => {
    localStorage.removeItem(LocalStorageKeys.AUTH_TOKEN);
    localStorage.removeItem(LocalStorageKeys.PROVIDER_TOKEN);
    localStorage.removeItem(LocalStorageKeys.NEEDS_PROVIDER_TOKEN);
  };

  return {
    clearAllItems,
    getItem,
    removeItem,
    setItem,
  };
};
