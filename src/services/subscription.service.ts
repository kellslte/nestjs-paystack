import { BaseService } from '../base.service';
import { PaystackModuleOptions } from '../interfaces';

export class SubscriptionService extends BaseService {
    constructor(options: PaystackModuleOptions) {
        super(options);
    }

    async create(data: {
        customer: string;
        plan: string;
        authorization?: string;
        start_date?: string;
    }) {
        return this.post('/subscription', data);
    }

    async list(params?: {
        page?: number;
        perPage?: number;
        customer?: number;
        plan?: number;
    }) {
        return this.get('/subscription', params);
    }

    async fetch(idOrCode: string | number) {
        return this.get(`/subscription/${idOrCode}`);
    }

    async activate(idOrCode: string | number, data: {
        code: string;
        token: string;
    }) {
        return this.post(`/subscription/activate/${idOrCode}`, data);
    }

    async cancel(idOrCode: string | number) {
        return this.post(`/subscription/disable/${idOrCode}`);
    }
}
