import { useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (newValue: T) => void] {
  const [value, setValue] = useState<T>(
    getLocalStorageValue(key, defaultValue)
  );
  return [
    value,
    (newValue: T) => {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    },
  ];
}

function getLocalStorageValue<T>(key: string, defaultValue: T): T {
  const stringValue = localStorage.getItem(key);

  if (stringValue === null || stringValue.length == 0) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }

  try {
    return JSON.parse(stringValue);
  } catch {
    return defaultValue;
  }
}
