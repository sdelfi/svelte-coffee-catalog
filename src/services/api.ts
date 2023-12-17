import type { CatalogItem, CatalogItemDTO } from "@/types/catalog.types";
import { API_ENDPOINTS, IMAGE_GENERATOR_URL } from "@/constants";

export const fetchCatalogItem = async (): Promise<CatalogItem> => {
  const response = await fetch(API_ENDPOINTS.catalogItem);

  const data = await response.json();

  return convertDTOToCatalogItem(data);
};

const convertDTOToCatalogItem = (dto: CatalogItemDTO): CatalogItem => {
  const { blend_name, origin, variety, notes, intensifier, uid } = dto;

  return {
    uid,
    name: blend_name,
    location: origin,
    description: variety,
    tags: notes?.split(","),
    image: {
      src: `${IMAGE_GENERATOR_URL}?name=${blend_name}`, // Если ссылка одинаковая, то браузер отдает кэшированную картинку
      caption: intensifier,
    },
  };
};
