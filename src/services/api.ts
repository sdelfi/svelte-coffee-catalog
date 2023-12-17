import type { CatalogItem } from "@/types/catalog.types";

export const fetchCatalogItem = async (): Promise<CatalogItem> => {
  const response = await fetch("https://random-data-api.com/api/coffee/random_coffee");

  const data = await response.json();

  return convertDTOToCatalogItem(data);
};

export const convertDTOToCatalogItem = (dto: any): CatalogItem => {
  const { blend_name, origin, variety, notes, intensifier, uid } = dto;

  return {
    uid,
    name: blend_name,
    origin,
    variety,
    intensifier,
    tags: notes?.split(","),
  };
};
