import { BaseService } from '../base.service';
import { PaystackModuleOptions } from '../interfaces';

export class BankService extends BaseService {
    constructor(options: PaystackModuleOptions) {
        super(options);
    }

    async listBanks(params?: {
        country?: string;
        use_cursor?: boolean;
        perPage?: number;
        pay_with_bank?: boolean;
        next_cursor?: string;
        previous_cursor?: string;
        gateway?: string;
        type?: string;
        currency?: string;
    }) {
        return this.get('/bank', params);
    }

    async listBranches(bankId: number, params?: {
        page?: number;
        perPage?: number;
    }) {
        return this.get(`/bank/${bankId}/branches`, params);
    }
}
