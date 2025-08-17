import { BaseService } from '../base.service';
import { PaystackModuleOptions } from '../interfaces';

export class SettlementService extends BaseService {
  constructor(options: PaystackModuleOptions) {
    super(options);
  }

  async list(params?: {
    page?: number;
    perPage?: number;
    from?: string;
    to?: string;
  }) {
    return this.get('/settlement', params);
  }

  async fetch(id: number) {
    return this.get(`/settlement/${id}`);
  }
}
