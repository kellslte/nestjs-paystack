export interface CreateSubscriptionRequest {
    customer: string;
    plan: string;
    authorization?: string;
    start_date?: string;
}

export interface CreateSubscriptionResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        status: string;
        subscription_code: string;
        amount: number;
        cron_expression: string;
        next_payment_date: string;
        open_invoice: string | null;
        open_invoice_human_desc: string | null;
        customer: number;
        plan: number;
        created_at: string;
        updated_at: string;
    };
}

export interface ListSubscriptionsRequest {
    page?: number;
    perPage?: number;
    customer?: number;
    plan?: number;
}

export interface ListSubscriptionsResponse {
    status: boolean;
    message: string;
    data: Array<{
        id: number;
        domain: string;
        status: string;
        subscription_code: string;
        amount: number;
        cron_expression: string;
        next_payment_date: string;
        open_invoice: string | null;
        open_invoice_human_desc: string | null;
        customer: number;
        plan: number;
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

export interface FetchSubscriptionRequest {
    idOrCode: string | number;
}

export interface FetchSubscriptionResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        status: string;
        subscription_code: string;
        amount: number;
        cron_expression: string;
        next_payment_date: string;
        open_invoice: string | null;
        open_invoice_human_desc: string | null;
        customer: number;
        plan: number;
        created_at: string;
        updated_at: string;
    };
}

export interface ActivateSubscriptionRequest {
    idOrCode: string | number;
    data: {
        code: string;
        token: string;
    };
}

export interface ActivateSubscriptionResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        status: string;
        subscription_code: string;
        amount: number;
        cron_expression: string;
        next_payment_date: string;
        open_invoice: string | null;
        open_invoice_human_desc: string | null;
        customer: number;
        plan: number;
        created_at: string;
        updated_at: string;
    };
}

export interface CancelSubscriptionRequest {
    idOrCode: string | number;
}

export interface CancelSubscriptionResponse {
    status: boolean;
    message: string;
    data: {
        id: number;
        domain: string;
        status: string;
        subscription_code: string;
        amount: number;
        cron_expression: string;
        next_payment_date: string;
        open_invoice: string | null;
        open_invoice_human_desc: string | null;
        customer: number;
        plan: number;
        created_at: string;
        updated_at: string;
    };
}
