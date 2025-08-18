export interface InitiateTransferRequest {
  source: 'balance';
  amount: number;
  recipient: string;
  reason?: string;
  currency?: string;
  reference?: string;
}

export interface InitiateTransferResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    amount: number;
    currency: string;
    source: string;
    reason: string;
    recipient: number;
    status: string;
    transfer_code: string;
    titan_code: string | null;
    transfer_recipient: number;
    created_at: string;
    updated_at: string;
  };
}

export interface ListTransfersRequest {
  page?: number;
  perPage?: number;
  customer?: number;
  status?: string;
  from?: string;
  to?: string;
}

export interface ListTransfersResponse {
  status: boolean;
  message: string;
  data: Array<{
    id: number;
    domain: string;
    amount: number;
    currency: string;
    source: string;
    reason: string;
    recipient: number;
    status: string;
    transfer_code: string;
    titan_code: string | null;
    transfer_recipient: number;
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

export interface FetchTransferRequest {
  idOrCode: string | number;
}

export interface FetchTransferResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    amount: number;
    currency: string;
    source: string;
    reason: string;
    recipient: number;
    status: string;
    transfer_code: string;
    titan_code: string | null;
    transfer_recipient: number;
    created_at: string;
    updated_at: string;
  };
}

export interface FinalizeTransferRequest {
  transfer_code: string;
  otp: string;
}

export interface FinalizeTransferResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    amount: number;
    currency: string;
    source: string;
    reason: string;
    recipient: number;
    status: string;
    transfer_code: string;
    titan_code: string | null;
    transfer_recipient: number;
    created_at: string;
    updated_at: string;
  };
}

export interface VerifyTransferRequest {
  reference: string;
}

export interface VerifyTransferResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    amount: number;
    currency: string;
    source: string;
    reason: string;
    recipient: number;
    status: string;
    transfer_code: string;
    titan_code: string | null;
    transfer_recipient: number;
    created_at: string;
    updated_at: string;
  };
}
