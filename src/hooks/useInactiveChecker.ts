import { onMount, onDestroy } from "svelte";

export const useInactiveChecker = (onInactive: () => void, inactiveTime: number) => {
  let timeoutId: number | null = null;

  const resetTimer = () => {
    if (timeoutId !== null) {
      clearInterval(timeoutId);
    }
    timeoutId = setInterval(onInactive, inactiveTime);
  };

  onMount(() => {
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    resetTimer();
  });

  onDestroy(() => {
    window.removeEventListener("mousemove", resetTimer);
    window.removeEventListener("keydown", resetTimer);
    if (timeoutId !== null) {
      clearInterval(timeoutId);
    }
  });
};
