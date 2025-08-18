export interface CreatePlanRequest {
  name: string;
  amount: number;
  interval: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'biannually' | 'annually';
  description?: string;
  send_invoices?: boolean;
  send_sms?: boolean;
  hosted_page?: boolean;
  hosted_page_url?: string;
  hosted_page_summary?: string;
  currency?: string;
  invoice_limit?: number;
  metadata?: Record<string, any>;
}

export interface CreatePlanResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    name: string;
    plan_code: string;
    description: string | null;
    amount: number;
    interval: string;
    send_invoices: boolean;
    send_sms: boolean;
    hosted_page: boolean;
    hosted_page_url: string | null;
    hosted_page_summary: string | null;
    currency: string;
    invoice_limit: number | null;
    metadata: Record<string, any> | null;
    created_at: string;
    updated_at: string;
  };
}

export interface ListPlansRequest {
  page?: number;
  perPage?: number;
  status?: string;
  interval?: string;
  amount?: number;
}

export interface ListPlansResponse {
  status: boolean;
  message: string;
  data: Array<{
    id: number;
    domain: string;
    name: string;
    plan_code: string;
    description: string | null;
    amount: number;
    interval: string;
    send_invoices: boolean;
    send_sms: boolean;
    hosted_page: boolean;
    hosted_page_url: string | null;
    hosted_page_summary: string | null;
    currency: string;
    invoice_limit: number | null;
    metadata: Record<string, any> | null;
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

export interface FetchPlanRequest {
  idOrCode: string | number;
}

export interface FetchPlanResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    name: string;
    plan_code: string;
    description: string | null;
    amount: number;
    interval: string;
    send_invoices: boolean;
    send_sms: boolean;
    hosted_page: boolean;
    hosted_page_url: string | null;
    hosted_page_summary: string | null;
    currency: string;
    invoice_limit: number | null;
    metadata: Record<string, any> | null;
    created_at: string;
    updated_at: string;
  };
}

export interface UpdatePlanRequest {
  name?: string;
  amount?: number;
  interval?: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'biannually' | 'annually';
  description?: string;
  send_invoices?: boolean;
  send_sms?: boolean;
  hosted_page?: boolean;
  hosted_page_url?: string;
  hosted_page_summary?: string;
  currency?: string;
  invoice_limit?: number;
  metadata?: Record<string, any>;
}

export interface UpdatePlanResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    name: string;
    plan_code: string;
    description: string | null;
    amount: number;
    interval: string;
    send_invoices: boolean;
    send_sms: boolean;
    hosted_page: boolean;
    hosted_page_url: string | null;
    hosted_page_summary: string | null;
    currency: string;
    invoice_limit: number | null;
    metadata: Record<string, any> | null;
    created_at: string;
    updated_at: string;
  };
}
