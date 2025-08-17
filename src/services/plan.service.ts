import { BaseService } from '../base.service';
import { PaystackModuleOptions } from '../interfaces';

export class PlanService extends BaseService {
    constructor(options: PaystackModuleOptions) {
        super(options);
    }

    /**
     * Create a plan
     */
    async create(data: {
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
    }) {
        return this.post('/plan', data);
    }

    /**
     * List plans
     */
    async list(params?: {
        page?: number;
        perPage?: number;
        status?: string;
        interval?: string;
        amount?: number;
    }) {
        return this.get('/plan', params);
    }

    /**
     * Fetch a plan
     */
    async fetch(idOrCode: string | number) {
        return this.get(`/plan/${idOrCode}`);
    }

    /**
     * Update a plan
     */
    async update(idOrCode: string | number, data: {
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
    }) {
        return this.put(`/plan/${idOrCode}`, data);
    }
}
