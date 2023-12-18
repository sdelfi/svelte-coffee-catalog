import { catalog } from "@/stores/catalog";
import { get } from "svelte/store";

describe("Catalog Store", () => {
  beforeEach(() => {
    catalog.reset();
  });

  test("Базовое состояние", () => {
    expect(get(catalog.isLoading)).toBe(false);
    expect(get(catalog.error)).toBe(null);
    expect(get(catalog)).toEqual([]);
  });

  test("Успешное получение записи", async () => {
    jest.spyOn(require("@/services/api"), "fetchCatalogItem").mockResolvedValueOnce({
      uid: "1",
      name: "Sample Item",
      location: "Sample Location",
      description: "Sample Description",
      tags: ["tag1", "tag2"],
      imageCaption: "Sample Caption",
    });

    await catalog.fetchItem();

    //   // Check the store state after fetchItem
    expect(get(catalog.isLoading)).toBe(false);
    expect(get(catalog.error)).toBe(null);
    expect(get(catalog)).toEqual([
      {
        uid: "1",
        name: "Sample Item",
        location: "Sample Location",
        description: "Sample Description",
        tags: ["tag1", "tag2"],
        imageCaption: "Sample Caption",
      },
    ]);
  });

  test("Ошибка получения записи", async () => {
    jest.spyOn(require("@/services/api"), "fetchCatalogItem").mockRejectedValueOnce("Ошибка");

    await catalog.fetchItem();

    expect(get(catalog.isLoading)).toBe(false);
    expect(get(catalog.error)).toBe("Ошибка при загрузке элемента каталога");
    expect(get(catalog)).toEqual([]);
  });
});
