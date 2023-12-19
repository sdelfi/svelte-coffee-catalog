import { writable } from "svelte/store";
import type { Notification, NotificationType } from "@/types/notifications.types";
import { uniqId } from "@/utils/uniqId";

const TIMEOUT = 3000;

const createNotificationStore = () => {
  const _notifications = writable<Notification[]>([]);
  const timers: ReturnType<typeof setTimeout>[] = [];

  const send = (message: string, type: NotificationType = "default", timeout: number = TIMEOUT): void => {
    _notifications.update((state) => {
      const newState = [...state, { id: uniqId(), type, message, timeout }];
      setupTimers(newState);
      return newState;
    });
  };

  const reset = () => {
    timers.forEach((timer) => clearTimeout(timer));
    _notifications.set([]);
  };

  const sendNotificationCreator = (type: NotificationType) => {
    return (message: string, timeout?: number) => send(message, type, timeout);
  };

  const setupTimers = (state: Notification[]) => {
    if (state.length > 0) {
      const timer = setTimeout(() => {
        _notifications.update((currentState) => {
          const removedItems = currentState.splice(1);

          timers.shift();
          return removedItems;
        });
      }, state[0].timeout);

      timers.push(timer);
    }
  };

  const { subscribe } = _notifications;

  return {
    subscribe,
    reset,
    default: sendNotificationCreator("default"),
    danger: sendNotificationCreator("danger"),
    warning: sendNotificationCreator("warning"),
    info: sendNotificationCreator("info"),
    success: sendNotificationCreator("success"),
  };
};

export const notifications = createNotificationStore();
