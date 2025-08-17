import { BaseService } from '../base.service';
import { PaystackModuleOptions } from '../interfaces';

export class TransferRecipientService extends BaseService {
  constructor(options: PaystackModuleOptions) {
    super(options);
  }

  async create(data: {
    type: 'nuban' | 'mobile_money' | 'gh_pesewa' | 'mpesa' | 'gh_money';
    name: string;
    account_number?: string;
    bank_code?: string;
    currency?: string;
    description?: string;
    metadata?: Record<string, any>;
    authorization_code?: string;
  }) {
    return this.post('/transferrecipient', data);
  }

  async list(params?: {
    page?: number;
    perPage?: number;
  }) {
    return this.get('/transferrecipient', params);
  }

  async fetch(idOrCode: string | number) {
    return this.get(`/transferrecipient/${idOrCode}`);
  }

  async update(idOrCode: string | number, data: {
    name?: string;
    email?: string;
    metadata?: Record<string, any>;
  }) {
    return this.put(`/transferrecipient/${idOrCode}`, data);
  }

  async delete(idOrCode: string | number) {
    return this.delete(`/transferrecipient/${idOrCode}`);
  }
}
