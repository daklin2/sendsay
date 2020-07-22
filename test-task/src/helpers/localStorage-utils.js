import { QUERIES } from '../constats/localStorageNames';

export const getStorage = (key) => localStorage.getItem(key);

export const setStorage = (key, data) => {
  const dataToStorage = data;

  if (key === QUERIES && getStorage(key)) {
    if (dataToStorage.length >= 18) {
      dataToStorage.pop();
    }
  }

  localStorage.setItem(key, JSON.stringify(dataToStorage));
};
