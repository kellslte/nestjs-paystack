import { BaseService } from '../base.service';
import { PaystackModuleOptions } from '../interfaces';

export class TransferService extends BaseService {
  constructor(options: PaystackModuleOptions) {
    super(options);
  }

  async initiate(data: {
    source: 'balance';
    amount: number;
    recipient: string;
    reason?: string;
    currency?: string;
    reference?: string;
  }) {
    return this.post('/transfer', data);
  }

  async list(params?: {
    page?: number;
    perPage?: number;
    customer?: number;
    status?: string;
    from?: string;
    to?: string;
  }) {
    return this.get('/transfer', params);
  }

  async fetch(idOrCode: string | number) {
    return this.get(`/transfer/${idOrCode}`);
  }

  async finalize(data: {
    transfer_code: string;
    otp: string;
  }) {
    return this.post('/transfer/finalize_transfer', data);
  }

  async verify(reference: string) {
    return this.get(`/transfer/verify/${reference}`);
  }
}
