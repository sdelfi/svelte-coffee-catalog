import { notifications } from "@/stores/notifications";
import { get } from "svelte/store";

describe("notifications store", () => {
  beforeEach(() => {
    notifications.reset();
  });

  test("Базовое состояние", () => {
    expect(get(notifications)).toEqual([]);
  });

  test("добавление уведомления", () => {
    notifications.default("Привет, это уведомление!");

    expect(get(notifications).length).toBe(1);
    expect(get(notifications)[0].message).toBe("Привет, это уведомление!");
  });

  afterAll(() => {
    // Сбрасываем таймеры
    notifications.reset();
  });
});
