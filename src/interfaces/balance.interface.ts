export interface CheckBalanceRequest {
  // No parameters needed for balance check
}

export interface CheckBalanceResponse {
  status: boolean;
  message: string;
  data: Array<{
    currency: string;
    balance: number;
    available_balance: number;
    ledger_balance: number;
  }>;
}

export interface ListLedgerRequest {
  page?: number;
  perPage?: number;
  from?: string;
  to?: string;
}

export interface ListLedgerResponse {
  status: boolean;
  message: string;
  data: Array<{
    id: number;
    domain: string;
    balance: number;
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
