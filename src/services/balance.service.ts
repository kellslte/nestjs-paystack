import { BaseService } from '../base.service';
import { PaystackModuleOptions } from '../interfaces';

export class BalanceService extends BaseService {
    constructor(options: PaystackModuleOptions) {
        super(options);
    }

    async check() {
        return this.get('/balance');
    }

    async listLedger(params?: {
        page?: number;
        perPage?: number;
        from?: string;
        to?: string;
    }) {
        return this.get('/balance/ledger', params);
    }
}
