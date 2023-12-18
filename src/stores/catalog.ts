import { writable } from "svelte/store";
import type { CatalogItem } from "@/types/catalog.types";
import { fetchCatalogItem } from "@/services/api";

function createCatalog() {
  const { subscribe, update, set } = writable<CatalogItem[]>([]);
  const isLoading = writable<boolean>(false);
  const error = writable<string | null>(null);

  const fetchItem = async (): Promise<void> => {
    try {
      isLoading.set(true);
      error.set(null);

      const item = await fetchCatalogItem();

      update((items) => [...items, item]);
    } catch (err) {
      error.set("Ошибка при загрузке элемента каталога");
    } finally {
      isLoading.set(false);
    }
  };

  const reset = (): void => {
    set([]);
    isLoading.set(false);
    error.set(null);
  };

  return { subscribe, fetchItem, reset, isLoading, error };
}

export const catalog = createCatalog();
