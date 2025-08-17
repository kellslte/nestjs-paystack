export interface InitializeTransactionRequest {
    amount: number;
    email: string;
    currency?: string;
    reference?: string;
    callback_url?: string;
    plan?: string;
    invoice_limit?: number;
    channels?: string[];
    split_code?: string;
    subaccount?: string;
    transaction_charge?: number;
    bearer?: 'account' | 'subaccount';
    metadata?: Record<string, any>;
}

export interface InitializeTransactionResponse {
    status: boolean;
    message: string;
    data: {
        authorization_url: string;
        access_code: string;
        reference: string;
    };
}

export interface VerifyTransactionRequest {
    reference: string;
}

export interface VerifyTransactionResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        amount: number;
        currency: string;
        due_date: string | null;
        has_invoice: boolean;
        invoice_number: number | null;
        description: string | null;
        tx_ref: string | null;
        ip_address: string | null;
        narration: string | null;
        status: string;
        paid: boolean;
        paid_at: string | null;
        metadata: Record<string, any> | null;
        log: Record<string, any> | null;
        fees: number;
        fees_split: Record<string, any> | null;
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
        plan: Record<string, any> | null;
        subaccount: Record<string, any> | null;
        splits: Record<string, any> | null;
        order_id: number | null;
        paidAt: string | null;
        createdAt: string;
        updatedAt: string;
        reference: string;
        channel: string;
        gateway_response: string;
        message: string | null;
        authorization: {
            authorization_code: string;
            bin: string;
            last4: string;
            exp_month: string;
            exp_year: string;
            channel: string;
            card_type: string;
            bank: string;
            country_code: string;
            brand: string;
            reusable: boolean;
            signature: string;
            account_name: string | null;
        } | null;
    };
}

export interface ListTransactionsRequest {
    page?: number;
    perPage?: number;
    customer?: number;
    status?: string;
    from?: string;
    to?: string;
    amount?: number;
}

export interface ListTransactionsResponse {
    status: boolean;
    message: string;
    data: Array<{
        id: number;
        domain: string;
        amount: number;
        currency: string;
        due_date: string | null;
        has_invoice: boolean;
        invoice_number: number | null;
        description: string | null;
        tx_ref: string | null;
        ip_address: string | null;
        narration: string | null;
        status: string;
        paid: boolean;
        paid_at: string | null;
        metadata: Record<string, any> | null;
        log: Record<string, any> | null;
        fees: number;
        fees_split: Record<string, any> | null;
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
        plan: Record<string, any> | null;
        subaccount: Record<string, any> | null;
        splits: Record<string, any> | null;
        order_id: number | null;
        paidAt: string | null;
        createdAt: string;
        updatedAt: string;
        reference: string;
        channel: string;
        gateway_response: string;
        message: string | null;
        authorization: {
            authorization_code: string;
            bin: string;
            last4: string;
            exp_month: string;
            exp_year: string;
            channel: string;
            card_type: string;
            bank: string;
            country_code: string;
            brand: string;
            reusable: boolean;
            signature: string;
            account_name: string | null;
        } | null;
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

export interface FetchTransactionRequest {
    id: number;
}

export interface FetchTransactionResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        amount: number;
        currency: string;
        due_date: string | null;
        has_invoice: boolean;
        invoice_number: number | null;
        description: string | null;
        tx_ref: string | null;
        ip_address: string | null;
        narration: string | null;
        status: string;
        paid: boolean;
        paid_at: string | null;
        metadata: Record<string, any> | null;
        log: Record<string, any> | null;
        fees: number;
        fees_split: Record<string, any> | null;
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
        plan: Record<string, any> | null;
        subaccount: Record<string, any> | null;
        splits: Record<string, any> | null;
        order_id: number | null;
        paidAt: string | null;
        createdAt: string;
        updatedAt: string;
        reference: string;
        channel: string;
        gateway_response: string;
        message: string | null;
        authorization: {
            authorization_code: string;
            bin: string;
            last4: string;
            exp_month: string;
            exp_year: string;
            channel: string;
            card_type: string;
            bank: string;
            country_code: string;
            brand: string;
            reusable: boolean;
            signature: string;
            account_name: string | null;
        } | null;
    };
}

export interface ChargeAuthorizationRequest {
    amount: number;
    email: string;
    authorization_code: string;
    reference?: string;
    currency?: string;
    metadata?: Record<string, any>;
}

export interface ChargeAuthorizationResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        amount: number;
        currency: string;
        due_date: string | null;
        has_invoice: boolean;
        invoice_number: number | null;
        description: string | null;
        tx_ref: string | null;
        ip_address: string | null;
        narration: string | null;
        status: string;
        paid: boolean;
        paid_at: string | null;
        metadata: Record<string, any> | null;
        log: Record<string, any> | null;
        fees: number;
        fees_split: Record<string, any> | null;
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
        plan: Record<string, any> | null;
        subaccount: Record<string, any> | null;
        splits: Record<string, any> | null;
        order_id: number | null;
        paidAt: string | null;
        createdAt: string;
        updatedAt: string;
        reference: string;
        channel: string;
        gateway_response: string;
        message: string | null;
        authorization: {
            authorization_code: string;
            bin: string;
            last4: string;
            exp_month: string;
            exp_year: string;
            channel: string;
            card_type: string;
            bank: string;
            country_code: string;
            brand: string;
            reusable: boolean;
            signature: string;
            account_name: string | null;
        } | null;
    };
}

export interface CheckAuthorizationRequest {
    authorization_code: string;
    amount: number;
    email: string;
    currency?: string;
}

export interface CheckAuthorizationResponse {
    status: boolean;
    message: string;
    data: {
        amount: number;
        currency: string;
        channel: string;
        authorization_code: string;
        card_type: string;
        bank: string;
        country_code: string;
        brand: string;
        reusable: boolean;
        signature: string;
        account_name: string | null;
    };
}

export interface ExportTransactionsRequest {
    from?: string;
    to?: string;
    settled?: boolean;
    payment_page?: number;
}

export interface ExportTransactionsResponse {
    status: boolean;
    message: string;
    data: {
        path: string;
    };
}

export interface RequestReauthorizationRequest {
    amount: number;
    email: string;
    authorization_code: string;
    currency?: string;
    reference?: string;
    metadata?: Record<string, any>;
}

export interface RequestReauthorizationResponse {
    status: boolean;
    message: string;
    data: {
        status: string;
        message: string;
        data: {
            authorization_url: string;
            access_code: string;
            reference: string;
        };
    };
}

export interface SendTransactionReceiptRequest {
    email: string;
    transaction_id: number;
}

export interface SendTransactionReceiptResponse {
    status: boolean;
    message: string;
}
