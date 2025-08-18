export interface ListSettlementsRequest {
    page?: number;
    perPage?: number;
    from?: string;
    to?: string;
}

export interface ListSettlementsResponse {
    status: boolean;
    message: string;
    data: Array<{
        id: number;
        domain: string;
        settlement_code: string;
        amount: number;
        currency: string;
        status: string;
        settlement_date: string;
        integration: number;
        domain: string;
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

export interface FetchSettlementRequest {
    id: number;
}

export interface FetchSettlementResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        settlement_code: string;
        amount: number;
        currency: string;
        status: string;
        settlement_date: string;
        integration: number;
        domain: string;
        created_at: string;
        updated_at: string;
    };
}
