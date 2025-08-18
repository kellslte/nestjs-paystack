export interface CreateSplitRequest {
    name: string;
    type: 'flat' | 'percentage';
    currency: string;
    subaccounts: Array<{
        subaccount: string;
        share: number;
    }>;
    bearer_type: 'account' | 'subaccount';
    bearer_subaccount?: string;
}

export interface CreateSplitResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        split_code: string;
        name: string;
        type: string;
        currency: string;
        integration: number;
        active: boolean;
        bearer_type: string;
        bearer_subaccount: number | null;
        subaccounts: Array<{
            subaccount: number;
            share: number;
            percentage_share: number;
            flat_fee: number;
            transaction_charge_type: string;
            transaction_charge: number;
        }>;
        total_share: number;
        created_at: string;
        updated_at: string;
    };
}

export interface ListSplitsRequest {
    page?: number;
    perPage?: number;
    active?: boolean;
}

export interface ListSplitsResponse {
    status: boolean;
    message: string;
    data: Array<{
        id: number;
        domain: string;
        split_code: string;
        name: string;
        type: string;
        currency: string;
        integration: number;
        active: boolean;
        bearer_type: string;
        bearer_subaccount: number | null;
        subaccounts: Array<{
            subaccount: number;
            share: number;
            percentage_share: number;
            flat_fee: number;
            transaction_charge_type: string;
            transaction_charge: number;
        }>;
        total_share: number;
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

export interface FetchSplitRequest {
    idOrCode: string | number;
}

export interface FetchSplitResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        split_code: string;
        name: string;
        type: string;
        currency: string;
        integration: number;
        active: boolean;
        bearer_type: string;
        bearer_subaccount: number | null;
        subaccounts: Array<{
            subaccount: number;
            share: number;
            percentage_share: number;
            flat_fee: number;
            transaction_charge_type: string;
            transaction_charge: number;
        }>;
        total_share: number;
        created_at: string;
        updated_at: string;
    };
}

export interface UpdateSplitRequest {
    idOrCode: string | number;
    data: {
        name?: string;
        active?: boolean;
        subaccounts?: Array<{
            subaccount: string;
            share: number;
        }>;
        bearer_type?: 'account' | 'subaccount';
        bearer_subaccount?: string;
    };
}

export interface UpdateSplitResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        split_code: string;
        name: string;
        type: string;
        currency: string;
        integration: number;
        active: boolean;
        bearer_type: string;
        bearer_subaccount: number | null;
        subaccounts: Array<{
            subaccount: number;
            share: number;
            percentage_share: number;
            flat_fee: number;
            transaction_charge_type: string;
            transaction_charge: number;
        }>;
        total_share: number;
        created_at: string;
        updated_at: string;
    };
}

export interface AddSubaccountToSplitRequest {
    idOrCode: string | number;
    data: {
        subaccount: string;
        share: number;
    };
}

export interface AddSubaccountToSplitResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        split_code: string;
        name: string;
        type: string;
        currency: string;
        integration: number;
        active: boolean;
        bearer_type: string;
        bearer_subaccount: number | null;
        subaccounts: Array<{
            subaccount: number;
            share: number;
            percentage_share: number;
            flat_fee: number;
            transaction_charge_type: string;
            transaction_charge: number;
        }>;
        total_share: number;
        created_at: string;
        updated_at: string;
    };
}

export interface RemoveSubaccountFromSplitRequest {
    idOrCode: string | number;
    data: {
        subaccount: string;
    };
}

export interface RemoveSubaccountFromSplitResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        split_code: string;
        name: string;
        type: string;
        currency: string;
        integration: number;
        active: boolean;
        bearer_type: string;
        bearer_subaccount: number | null;
        subaccounts: Array<{
            subaccount: number;
            share: number;
            percentage_share: number;
            flat_fee: number;
            transaction_charge_type: string;
            transaction_charge: number;
        }>;
        total_share: number;
        created_at: string;
        updated_at: string;
    };
}
