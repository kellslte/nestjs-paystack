export interface ListBanksRequest {
  country?: string;
  use_cursor?: boolean;
  perPage?: number;
  pay_with_bank?: boolean;
  next_cursor?: string;
  previous_cursor?: string;
  gateway?: string;
  type?: string;
  currency?: string;
}

export interface ListBanksResponse {
  status: boolean;
  message: string;
  data: Array<{
    id: number;
    name: string;
    slug: string;
    code: string;
    longcode: string;
    gateway: string | null;
    pay_with_bank: boolean;
    active: boolean;
    country: string;
    currency: string;
    type: string;
    is_deleted: boolean;
    createdAt: string;
    updatedAt: string;
  }>;
  meta: {
    next_cursor: string | null;
    previous_cursor: string | null;
    perPage: number;
  };
}

export interface ListBankBranchesRequest {
  page?: number;
  perPage?: number;
}

export interface ListBankBranchesResponse {
  status: boolean;
  message: string;
  data: Array<{
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
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
