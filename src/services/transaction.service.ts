import { BaseService } from '../base.service';
import { PaystackModuleOptions } from '../interfaces';

export class TransactionService extends BaseService {
  constructor(options: PaystackModuleOptions) {
    super(options);
  }

  /**
   * Initialize a transaction
   */
  async initialize(data: {
    amount: number;
    email: string;
    currency?: string;
    reference?: string;
    callback_url?: string;
    plan?: string;
    invoice_limit?: number;
    channels?: string[];
    split_code?: string;
    subaccount?: string;
    transaction_charge?: number;
    bearer?: 'account' | 'subaccount';
    metadata?: Record<string, any>;
  }) {
    return this.post('/transaction/initialize', data);
  }

  /**
   * Verify a transaction
   */
  async verify(reference: string) {
    return this.get(`/transaction/verify/${reference}`);
  }

  /**
   * List transactions
   */
  async list(params?: {
    page?: number;
    perPage?: number;
    customer?: number;
    status?: string;
    from?: string;
    to?: string;
    amount?: number;
  }) {
    return this.get('/transaction', params);
  }

  /**
   * Fetch a transaction
   */
  async fetch(id: number) {
    return this.get(`/transaction/${id}`);
  }

  /**
   * Charge an authorization
   */
  async chargeAuthorization(data: {
    amount: number;
    email: string;
    authorization_code: string;
    reference?: string;
    currency?: string;
    metadata?: Record<string, any>;
  }) {
    return this.post('/transaction/charge_authorization', data);
  }

  /**
   * Check authorization
   */
  async checkAuthorization(data: {
    authorization_code: string;
    amount: number;
    email: string;
    currency?: string;
  }) {
    return this.post('/transaction/check_authorization', data);
  }

  /**
   * Export transactions
   */
  async export(params?: {
    from?: string;
    to?: string;
    settled?: boolean;
    payment_page?: number;
  }) {
    return this.get('/transaction/export', params);
  }

  /**
   * Request reauthorization
   */
  async requestReauthorization(data: {
    amount: number;
    email: string;
    authorization_code: string;
    currency?: string;
    reference?: string;
    metadata?: Record<string, any>;
  }) {
    return this.post('/transaction/request_reauthorization', data);
  }

  /**
   * Send transaction receipt
   */
  async sendReceipt(data: {
    email: string;
    transaction_id: number;
  }) {
    return this.post('/transaction/send_receipt', data);
  }
}
