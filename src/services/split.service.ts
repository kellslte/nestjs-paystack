import { BaseService } from '../base.service';
import { PaystackModuleOptions } from '../interfaces';

export class SplitService extends BaseService {
  constructor(options: PaystackModuleOptions) {
    super(options);
  }

  async create(data: {
    name: string;
    type: 'flat' | 'percentage';
    currency: string;
    subaccounts: Array<{
      subaccount: string;
      share: number;
    }>;
    bearer_type: 'account' | 'subaccount';
    bearer_subaccount?: string;
  }) {
    return this.post('/split', data);
  }

  async list(params?: {
    page?: number;
    perPage?: number;
    active?: boolean;
  }) {
    return this.get('/split', params);
  }

  async fetch(idOrCode: string | number) {
    return this.get(`/split/${idOrCode}`);
  }

  async update(idOrCode: string | number, data: {
    name?: string;
    active?: boolean;
    subaccounts?: Array<{
      subaccount: string;
      share: number;
    }>;
    bearer_type?: 'account' | 'subaccount';
    bearer_subaccount?: string;
  }) {
    return this.put(`/split/${idOrCode}`, data);
  }

  async addSubaccount(idOrCode: string | number, data: {
    subaccount: string;
    share: number;
  }) {
    return this.post(`/split/${idOrCode}/subaccount/add`, data);
  }

  async removeSubaccount(idOrCode: string | number, data: {
    subaccount: string;
  }) {
    return this.post(`/split/${idOrCode}/subaccount/remove`, data);
  }
}
