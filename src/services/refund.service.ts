import { BaseService } from '../base.service';
import { PaystackModuleOptions } from '../interfaces';

export class RefundService extends BaseService {
  constructor(options: PaystackModuleOptions) {
    super(options);
  }

  async create(data: {
    transaction: string;
    amount?: number;
    currency?: string;
    customer_note?: string;
    merchant_note?: string;
  }) {
    return this.post('/refund', data);
  }

  async list(params?: {
    page?: number;
    perPage?: number;
    from?: string;
    to?: string;
    reference?: string;
  }) {
    return this.get('/refund', params);
  }

  async fetch(id: number) {
    return this.get(`/refund/${id}`);
  }
}
