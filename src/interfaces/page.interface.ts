export interface CreatePageRequest {
  name: string;
  description?: string;
  amount?: number;
  slug?: string;
  redirect_url?: string;
  custom_fields?: Array<{
    display_name: string;
    variable_name: string;
    value: string;
  }>;
  metadata?: Record<string, any>;
}

export interface CreatePageResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    name: string;
    description: string | null;
    amount: number | null;
    currency: string;
    slug: string;
    custom_fields: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
    metadata: Record<string, any> | null;
    active: boolean;
    redirect_url: string | null;
    success_url: string | null;
    created_at: string;
    updated_at: string;
  };
}

export interface ListPagesRequest {
  page?: number;
  perPage?: number;
  active?: boolean;
}

export interface ListPagesResponse {
  status: boolean;
  message: string;
  data: Array<{
    id: number;
    domain: string;
    name: string;
    description: string | null;
    amount: number | null;
    currency: string;
    slug: string;
    custom_fields: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
    metadata: Record<string, any> | null;
    active: boolean;
    redirect_url: string | null;
    success_url: string | null;
    created_at: string;
    updated_at: string;
  }>;
  meta: {
    total: number;
    total_volume: number;
    total_volume_by_currency: Record<string, number>;
    page: number;
    perPage: number;
    pageCount: number;
  };
}

export interface FetchPageRequest {
  idOrSlug: string | number;
}

export interface FetchPageResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    name: string;
    description: string | null;
    amount: number | null;
    currency: string;
    slug: string;
    custom_fields: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
    metadata: Record<string, any> | null;
    active: boolean;
    redirect_url: string | null;
    success_url: string | null;
    created_at: string;
    updated_at: string;
  };
}

export interface UpdatePageRequest {
  name?: string;
  description?: string;
  amount?: number;
  active?: boolean;
  redirect_url?: string;
  custom_fields?: Array<{
    display_name: string;
    variable_name: string;
    value: string;
  }>;
  metadata?: Record<string, any>;
}

export interface UpdatePageResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    name: string;
    description: string | null;
    amount: number | null;
    currency: string;
    slug: string;
    custom_fields: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
    metadata: Record<string, any> | null;
    active: boolean;
    redirect_url: string | null;
    success_url: string | null;
    created_at: string;
    updated_at: string;
  };
}

export interface CheckSlugAvailabilityRequest {
  slug: string;
}

export interface CheckSlugAvailabilityResponse {
  status: boolean;
  message: string;
  data: {
    available: boolean;
  };
}
