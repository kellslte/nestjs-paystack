export interface CreateCustomerRequest {
    email: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    metadata?: Record<string, any>;
}

export interface CreateCustomerResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        customer_code: string;
        first_name: string | null;
        last_name: string | null;
        email: string;
        phone: string | null;
        metadata: Record<string, any> | null;
        risk_action: string;
        international_format_phone: string | null;
        created_at: string;
        updated_at: string;
    };
}

export interface ListCustomersRequest {
    page?: number;
    perPage?: number;
    from?: string;
    to?: string;
}

export interface ListCustomersResponse {
    status: boolean;
    message: string;
    data: Array<{
        id: number;
        domain: string;
        customer_code: string;
        first_name: string | null;
        last_name: string | null;
        email: string;
        phone: string | null;
        metadata: Record<string, any> | null;
        risk_action: string;
        international_format_phone: string | null;
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

export interface FetchCustomerRequest {
    idOrCode: string | number;
}

export interface FetchCustomerResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        customer_code: string;
        first_name: string | null;
        last_name: string | null;
        email: string;
        phone: string | null;
        metadata: Record<string, any> | null;
        risk_action: string;
        international_format_phone: string | null;
        created_at: string;
        updated_at: string;
    };
}

export interface UpdateCustomerRequest {
    first_name?: string;
    last_name?: string;
    phone?: string;
    metadata?: Record<string, any>;
}

export interface UpdateCustomerResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        customer_code: string;
        first_name: string | null;
        last_name: string | null;
        email: string;
        phone: string | null;
        metadata: Record<string, any> | null;
        risk_action: string;
        international_format_phone: string | null;
        created_at: string;
        updated_at: string;
    };
}

export interface ValidateCustomerRequest {
    first_name: string;
    last_name: string;
    type: 'bank_account' | 'card';
    value: string;
    country: string;
    bvn: string;
    bank_code: string;
    account_number: string;
    account_name: string;
}

export interface ValidateCustomerResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        customer_code: string;
        first_name: string | null;
        last_name: string | null;
        email: string;
        phone: string | null;
        metadata: Record<string, any> | null;
        risk_action: string;
        international_format_phone: string | null;
        created_at: string;
        updated_at: string;
    };
}

export interface SetRiskActionRequest {
    customer: string;
    risk_action: 'allow' | 'deny';
}

export interface SetRiskActionResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        customer_code: string;
        first_name: string | null;
        last_name: string | null;
        email: string;
        phone: string | null;
        metadata: Record<string, any> | null;
        risk_action: string;
        international_format_phone: string | null;
        created_at: string;
        updated_at: string;
    };
}

export interface DeactivateAuthorizationRequest {
    authorization_code: string;
}

export interface DeactivateAuthorizationResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        customer_code: string;
        first_name: string | null;
        last_name: string | null;
        email: string;
        phone: string | null;
        metadata: Record<string, any> | null;
        risk_action: string;
        international_format_phone: string | null;
        created_at: string;
        updated_at: string;
    };
}
