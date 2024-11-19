// ? Types
import { LocalStorageKeys } from '@/types/global';

export const useLocalStorage = () => {
  const setItem = (key: LocalStorageKeys, value: string) => {
    localStorage.setItem(key, value);
  };

  const clearAllItems = () => {
    localStorage.removeItem(LocalStorageKeys.AUTH_TOKEN);
    localStorage.removeItem(LocalStorageKeys.PROVIDER_TOKEN);
    localStorage.removeItem(LocalStorageKeys.NEEDS_PROVIDER_TOKEN);
  };

  return {
    setItem,
    clearAllItems,
  };
};
