import type { CatalogItem } from "@/types/catalog.types";
import { apiEndpoints } from "@/constants";

export const fetchCatalogItem = async (): Promise<CatalogItem> => {
  const response = await fetch(apiEndpoints.catalogItem);

  const data = await response.json();

  return convertDTOToCatalogItem(data);
};

const convertDTOToCatalogItem = (dto: any): CatalogItem => {
  const { blend_name, origin, variety, notes, intensifier, uid } = dto;

  return {
    uid,
    name: blend_name,
    location: origin,
    description: variety,
    imageCaption: intensifier,
    tags: notes?.split(","),
  };
};
