import { BaseService } from '../base.service';
import { PaystackModuleOptions } from '../interfaces';

export class ChargeService extends BaseService {
    constructor(options: PaystackModuleOptions) {
        super(options);
    }

    async create(data: {
        email: string;
        amount: number;
        authorization_code?: string;
        pin?: string;
        reference?: string;
        birthday?: string;
        metadata?: Record<string, any>;
        card?: {
            number: string;
            cvv: string;
            expiry_month: string;
            expiry_year: string;
        };
        bank?: {
            code: string;
            account_number: string;
        };
        ussd?: {
            type: string;
        };
        mobile_money?: {
            phone: string;
            provider: string;
        };
    }) {
        return this.post('/charge', data);
    }

    async submitPin(data: {
        pin: string;
        reference: string;
    }) {
        return this.post('/charge/submit_pin', data);
    }

    async submitOtp(data: {
        otp: string;
        reference: string;
    }) {
        return this.post('/charge/submit_otp', data);
    }

    async submitPhone(data: {
        phone: string;
        reference: string;
    }) {
        return this.post('/charge/submit_phone', data);
    }

    async submitBirthday(data: {
        birthday: string;
        reference: string;
    }) {
        return this.post('/charge/submit_birthday', data);
    }

    async checkPending(reference: string) {
        return this.get(`/charge/${reference}`);
    }
}
