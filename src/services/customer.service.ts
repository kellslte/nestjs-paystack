import { BaseService } from '../base.service';
import { PaystackModuleOptions } from '../interfaces';

export class CustomerService extends BaseService {
  constructor(options: PaystackModuleOptions) {
    super(options);
  }

  /**
   * Create a customer
   */
  async create(data: {
    email: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    metadata?: Record<string, any>;
  }) {
    return this.post('/customer', data);
  }

  /**
   * List customers
   */
  async list(params?: {
    page?: number;
    perPage?: number;
    from?: string;
    to?: string;
  }) {
    return this.get('/customer', params);
  }

  /**
   * Fetch a customer
   */
  async fetch(idOrCode: string | number) {
    return this.get(`/customer/${idOrCode}`);
  }

  /**
   * Update a customer
   */
  async update(idOrCode: string | number, data: {
    first_name?: string;
    last_name?: string;
    phone?: string;
    metadata?: Record<string, any>;
  }) {
    return this.put(`/customer/${idOrCode}`, data);
  }

  /**
   * Validate a customer
   */
  async validate(idOrCode: string | number, data: {
    first_name: string;
    last_name: string;
    type: 'bank_account' | 'card';
    value: string;
    country: string;
    bvn: string;
    bank_code: string;
    account_number: string;
    account_name: string;
  }) {
    return this.post(`/customer/${idOrCode}/identification`, data);
  }

  /**
   * Blacklist a customer
   */
  async blacklist(idOrCode: string | number, data: {
    customer: string;
    risk_action: 'deny';
  }) {
    return this.post(`/customer/set_risk_action`, data);
  }

  /**
   * Whitelist a customer
   */
  async whitelist(idOrCode: string | number, data: {
    customer: string;
    risk_action: 'allow';
  }) {
    return this.post(`/customer/set_risk_action`, data);
  }

  /**
   * Deactivate authorization
   */
  async deactivateAuthorization(authorizationCode: string) {
    return this.post('/customer/deactivate_authorization', {
      authorization_code: authorizationCode,
    });
  }
}
