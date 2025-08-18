export interface ListDisputesRequest {
  page?: number;
  perPage?: number;
  from?: string;
  to?: string;
  status?: string;
  transaction?: number;
}

export interface ListDisputesResponse {
  status: boolean;
  message: string;
  data: Array<{
    id: number;
    domain: string;
    amount: number;
    currency: string;
    status: string;
    resolution: string;
    category: string;
    transaction_reference: string;
    transaction_id: number;
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
      customer_code: string;
      phone: string | null;
      metadata: Record<string, any> | null;
      risk_action: string;
      international_format_phone: string | null;
    };
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

export interface FetchDisputeRequest {
  id: number;
}

export interface FetchDisputeResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    amount: number;
    currency: string;
    status: string;
    resolution: string;
    category: string;
    transaction_reference: string;
    transaction_id: number;
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
      customer_code: string;
      phone: string | null;
      metadata: Record<string, any> | null;
      risk_action: string;
      international_format_phone: string | null;
    };
    created_at: string;
    updated_at: string;
  };
}

export interface UpdateDisputeRequest {
  refund_amount: number;
  resolution: 'merchant-accepted' | 'declined';
  reason: string;
}

export interface UpdateDisputeResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    amount: number;
    currency: string;
    status: string;
    resolution: string;
    category: string;
    transaction_reference: string;
    transaction_id: number;
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
      customer_code: string;
      phone: string | null;
      metadata: Record<string, any> | null;
      risk_action: string;
      international_format_phone: string | null;
    };
    created_at: string;
    updated_at: string;
  };
}

export interface AddEvidenceRequest {
  customer_email: string;
  customer_name: string;
  customer_phone: string;
  service_details: string;
  delivery_address?: string;
  delivery_date?: string;
  delivery_confirmation?: string;
  customer_signature?: string;
}

export interface AddEvidenceResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    amount: number;
    currency: string;
    status: string;
    resolution: string;
    category: string;
    transaction_reference: string;
    transaction_id: number;
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
      customer_code: string;
      phone: string | null;
      metadata: Record<string, any> | null;
      risk_action: string;
      international_format_phone: string | null;
    };
    created_at: string;
    updated_at: string;
  };
}

export interface UploadEvidenceRequest {
  filename: string;
  url: string;
}

export interface UploadEvidenceResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    amount: number;
    currency: string;
    status: string;
    resolution: string;
    category: string;
    transaction_reference: string;
    transaction_id: number;
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
      customer_code: string;
      phone: string | null;
      metadata: Record<string, any> | null;
      risk_action: string;
      international_format_phone: string | null;
    };
    created_at: string;
    updated_at: string;
  };
}
