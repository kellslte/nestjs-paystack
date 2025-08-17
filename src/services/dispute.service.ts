import { BaseService } from '../base.service';
import { PaystackModuleOptions } from '../interfaces';

export class DisputeService extends BaseService {
  constructor(options: PaystackModuleOptions) {
    super(options);
  }

  async list(params?: {
    page?: number;
    perPage?: number;
    from?: string;
    to?: string;
    status?: string;
    transaction?: number;
  }) {
    return this.get('/dispute', params);
  }

  async fetch(id: number) {
    return this.get(`/dispute/${id}`);
  }

  async update(id: number, data: {
    refund_amount: number;
    resolution: 'merchant-accepted' | 'declined';
    reason: string;
  }) {
    return this.put(`/dispute/${id}`, data);
  }

  async addEvidence(id: number, data: {
    customer_email: string;
    customer_name: string;
    customer_phone: string;
    service_details: string;
    delivery_address?: string;
    delivery_date?: string;
    delivery_confirmation?: string;
    customer_signature?: string;
  }) {
    return this.post(`/dispute/${id}/evidence`, data);
  }

  async uploadEvidence(id: number, data: {
    filename: string;
    url: string;
  }) {
    return this.post(`/dispute/${id}/evidence/upload`, data);
  }
}
