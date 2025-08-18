export interface CreateTransferRecipientRequest {
    type: 'nuban' | 'mobile_money' | 'gh_pesewa' | 'mpesa' | 'gh_money';
    name: string;
    account_number?: string;
    bank_code?: string;
    currency?: string;
    description?: string;
    metadata?: Record<string, any>;
    authorization_code?: string;
}

export interface CreateTransferRecipientResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        type: string;
        name: string;
        account_number: string;
        bank_code: string;
        currency: string;
        description: string | null;
        metadata: Record<string, any> | null;
        recipient_code: string;
        active: boolean;
        integration: number;
        created_at: string;
        updated_at: string;
    };
}

export interface ListTransferRecipientsRequest {
    page?: number;
    perPage?: number;
}

export interface ListTransferRecipientsResponse {
    status: boolean;
    message: string;
    data: Array<{
        id: number;
        domain: string;
        type: string;
        name: string;
        account_number: string;
        bank_code: string;
        currency: string;
        description: string | null;
        metadata: Record<string, any> | null;
        recipient_code: string;
        active: boolean;
        integration: number;
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

export interface FetchTransferRecipientRequest {
    idOrCode: string | number;
}

export interface FetchTransferRecipientResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        type: string;
        name: string;
        account_number: string;
        bank_code: string;
        currency: string;
        description: string | null;
        metadata: Record<string, any> | null;
        recipient_code: string;
        active: boolean;
        integration: number;
        created_at: string;
        updated_at: string;
    };
}

export interface UpdateTransferRecipientRequest {
    idOrCode: string | number;
    data: {
        name?: string;
        email?: string;
        metadata?: Record<string, any>;
    };
}

export interface UpdateTransferRecipientResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        type: string;
        name: string;
        account_number: string;
        bank_code: string;
        currency: string;
        description: string | null;
        metadata: Record<string, any> | null;
        recipient_code: string;
        active: boolean;
        integration: number;
        created_at: string;
        updated_at: string;
    };
}

export interface DeleteTransferRecipientRequest {
    idOrCode: string | number;
}

export interface DeleteTransferRecipientResponse {
    status: boolean;
    message: string;
    data: null;
}
