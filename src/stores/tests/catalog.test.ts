import { catalog } from "@/stores/catalog";
import { get } from "svelte/store";
import * as api from "@/services/api";

describe("catalog store", () => {
  beforeEach(() => {
    catalog.reset();
  });

  test("Базовое состояние", () => {
    expect(get(catalog.isLoading)).toBe(false);
    expect(get(catalog.error)).toBe(null);
    expect(get(catalog)).toEqual([]);
  });

  test("Успешное получение записи", async () => {
    jest.spyOn(api, "fetchCatalogItem").mockResolvedValueOnce({
      uid: "1",
      name: "Sample Item",
      location: "Sample Location",
      description: "Sample Description",
      tags: ["tag1", "tag2"],
      image: {
        caption: "Sample Caption",
        src: "https://example.com/image.jpg",
      },
    });

    await catalog.fetchItem();

    expect(get(catalog.isLoading)).toBe(false);
    expect(get(catalog.error)).toBe(null);
    expect(get(catalog)).toEqual([
      {
        uid: "1",
        name: "Sample Item",
        location: "Sample Location",
        description: "Sample Description",
        tags: ["tag1", "tag2"],
        image: {
          caption: "Sample Caption",
          src: "https://example.com/image.jpg",
        },
      },
    ]);
  });

  test("Ошибка получения записи", async () => {
    jest.spyOn(api, "fetchCatalogItem").mockRejectedValueOnce("Ошибка");

    await catalog.fetchItem();

    expect(get(catalog.isLoading)).toBe(false);
    expect(get(catalog.error)).toBe("Ошибка при загрузке элемента каталога");
    expect(get(catalog)).toEqual([]);
  });
});
