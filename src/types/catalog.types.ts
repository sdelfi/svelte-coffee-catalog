export interface CatalogItem {
  uid: string;
  name: string;
  location: string;
  description: string;
  tags: string[];
  image: {
    src: string;
    caption?: string;
  };
}

export interface CatalogItemDTO {
  blend_name: string;
  origin: string;
  variety: string;
  notes: string;
  intensifier: string;
  uid: string;
}
