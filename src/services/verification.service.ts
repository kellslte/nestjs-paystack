import { BaseService } from '../base.service';
import { PaystackModuleOptions } from '../interfaces';

export class VerificationService extends BaseService {
    constructor(options: PaystackModuleOptions) {
        super(options);
    }

    async verifyAccountNumber(data: {
        account_number: string;
        account_code: string;
    }) {
        return this.get('/bank/resolve', data);
    }

    async verifyCardBin(bin: string) {
        return this.get(`/decision/bin/${bin}`);
    }

    async verifyBVN(bvn: string) {
        return this.get(`/bank/resolve_bvn/${bvn}`);
    }
}
