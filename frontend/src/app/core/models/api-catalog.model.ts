export interface ApiCatalogItem {
  id: string;
  name: string;
  category: string;
  description: string;
  descriptionSummary: string;
  useCases: string[];
  status: ApiStatus;
  version: string;
  contactTeam: ContactInfo;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export type ApiStatus = 'Borrador' | 'Publicada' | 'Deprecada' | 'Retirada';

export interface ContactInfo {
  teamName: string;
  email: string;
  area: string;
}

export interface CatalogSearchParams {
  query?: string;
  category?: string;
}
