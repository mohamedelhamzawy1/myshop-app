// interfaces/brand.ts
export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
}

export interface BrandsResponse {
  results: number;
  metadata: Metadata;
  data: Brand[];
}
