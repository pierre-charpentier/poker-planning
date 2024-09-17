import { useMemo, useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  const controller = new AbortController();

  window.addEventListener(
    "storage",
    () => {
      callback();
    },
    { signal: controller.signal }
  );

  return () => {
    controller.abort();
  };
};

const getSnapshot = () => {
  return localStorage.getItem("userId");
};

export const useLocalStorage: () => [
  { userId?: string | null },
  { setUserId: (userId: string) => void }
] = () => {
  const userId = useSyncExternalStore(subscribe, getSnapshot);

  const result = useMemo<
    [{ userId?: string | null }, { setUserId: (userId: string) => void }]
  >(
    () => [
      { userId },
      {
        setUserId: (userId: string) => {
          localStorage.setItem("userId", userId);
        },
      },
    ],
    [userId]
  );

  return result;
};
