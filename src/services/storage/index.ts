export enum LocalStorageKeys {
  Wallets = 'wallets',
}

export function getItemFromLocalStorage<T = any, F = any>(
  key: LocalStorageKeys,
  fallback?: F,
): N<Record<string, any> | T | F> {
  try {
    const value = window.localStorage.getItem(key);
    if (value === null || value === undefined) {
      return fallback || null;
    }
    return JSON.parse(value);
  } catch (error: unknown) {
    return fallback || null;
  }
}

export function setItemInLocalStorage(key: LocalStorageKeys, value: any) {
  let stored;
  try {
    stored = JSON.stringify(value);
  } catch (error: unknown) {
    return false;
  }
  try {
    window.localStorage.setItem(key, stored);
  } catch (error: unknown) {
    return false;
  }

  return true;
}

export function removeItemFromLocalStorage(key: LocalStorageKeys) {
  window.localStorage.removeItem(key);
}
