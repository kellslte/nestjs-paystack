import { BaseService } from '../base.service';
import {
    PaystackModuleOptions,
    VerifyAccountNumberRequest,
    VerifyAccountNumberResponse,
    VerifyCardBinResponse,
    VerifyBVNResponse
} from '../interfaces';

export class VerificationService extends BaseService {
    constructor(options: PaystackModuleOptions) {
        super(options);
    }

    async verifyAccountNumber(data: VerifyAccountNumberRequest): Promise<VerifyAccountNumberResponse | any> {
        return this.get<VerifyAccountNumberResponse>('/bank/resolve', data);
    }

    async verifyCardBin(bin: string): Promise<VerifyCardBinResponse | any> {
        return this.get<VerifyCardBinResponse>(`/decision/bin/${bin}`);
    }

    async verifyBVN(bvn: string): Promise<VerifyBVNResponse | any> {
        return this.get<VerifyBVNResponse>(`/bank/resolve_bvn/${bvn}`);
    }
}
