import { BaseService } from '../base.service';
import { PaystackModuleOptions } from '../interfaces';

export class PageService extends BaseService {
    constructor(options: PaystackModuleOptions) {
        super(options);
    }

    async create(data: {
        name: string;
        description?: string;
        amount?: number;
        slug?: string;
        redirect_url?: string;
        custom_fields?: Array<{
            display_name: string;
            variable_name: string;
            value: string;
        }>;
        metadata?: Record<string, any>;
    }) {
        return this.post('/page', data);
    }

    async list(params?: {
        page?: number;
        perPage?: number;
        active?: boolean;
    }) {
        return this.get('/page', params);
    }

    async fetch(idOrSlug: string | number) {
        return this.get(`/page/${idOrSlug}`);
    }

    async update(idOrSlug: string | number, data: {
        name?: string;
        description?: string;
        amount?: number;
        active?: boolean;
        redirect_url?: string;
        custom_fields?: Array<{
            display_name: string;
            variable_name: string;
            value: string;
        }>;
        metadata?: Record<string, any>;
    }) {
        return this.put(`/page/${idOrSlug}`, data);
    }

    async checkSlug(slug: string) {
        return this.get(`/page/check_slug_availability/${slug}`);
    }
}
