export interface CreateRefundRequest {
  transaction: string;
  amount?: number;
  currency?: string;
  customer_note?: string;
  merchant_note?: string;
}

export interface CreateRefundResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    amount: number;
    currency: string;
    transaction_id: number;
    reason: string;
    customer_note: string | null;
    merchant_note: string | null;
    status: string;
    refunded_by: string;
    created_at: string;
    updated_at: string;
  };
}

export interface ListRefundsRequest {
  page?: number;
  perPage?: number;
  from?: string;
  to?: string;
  reference?: string;
}

export interface ListRefundsResponse {
  status: boolean;
  message: string;
  data: Array<{
    id: number;
    domain: string;
    amount: number;
    currency: string;
    transaction_id: number;
    reason: string;
    customer_note: string | null;
    merchant_note: string | null;
    status: string;
    refunded_by: string;
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

export interface FetchRefundRequest {
  id: number;
}

export interface FetchRefundResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    amount: number;
    currency: string;
    transaction_id: number;
    reason: string;
    customer_note: string | null;
    merchant_note: string | null;
    status: string;
    refunded_by: string;
    created_at: string;
    updated_at: string;
  };
}
