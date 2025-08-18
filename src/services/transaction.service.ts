import {
  InitializeTransactionResponse,
  ListTransactionsResponse,
  FetchTransactionResponse,
  VerifyTransactionResponse,
  ChargeAuthorizationResponse,
  CheckAuthorizationResponse,
  ExportTransactionsResponse,
  RequestReauthorizationResponse,
  SendTransactionReceiptResponse,
} from 'src/interfaces/transaction.interface';
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
  }): Promise<InitializeTransactionResponse> {
    return this.post('/transaction/initialize', data);
  }

  /**
   * Verify a transaction
   */
  async verify(reference: string): Promise<VerifyTransactionResponse | any> {
    return this.get<VerifyTransactionResponse>(`/transaction/verify/${reference}`);
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
  }): Promise<ListTransactionsResponse | any> {
    return this.get<ListTransactionsResponse>('/transaction', params);
  }

  /**
   * Fetch a transaction
   */
  async fetch(id: number): Promise<FetchTransactionResponse | any> {
    return this.get<FetchTransactionResponse>(`/transaction/${id}`);
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
  }): Promise<ChargeAuthorizationResponse | any> {
    return this.post<ChargeAuthorizationResponse>('/transaction/charge_authorization', data);
  }

  /**
   * Check authorization
   */
  async checkAuthorization(data: {
    authorization_code: string;
    amount: number;
    email: string;
    currency?: string;
  }): Promise<CheckAuthorizationResponse | any> {
    return this.post<CheckAuthorizationResponse>('/transaction/check_authorization', data);
  }

  /**
   * Export transactions
   */
  async export(params?: {
    from?: string;
    to?: string;
    settled?: boolean;
    payment_page?: number;
  }): Promise<ExportTransactionsResponse | any> {
    return this.get<ExportTransactionsResponse>('/transaction/export', params);
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
  }): Promise<RequestReauthorizationResponse | any> {
    return this.post<RequestReauthorizationResponse>('/transaction/request_reauthorization', data);
  }

  /**
   * Send transaction receipt
   */
  async sendReceipt(data: {
    email: string;
    transaction_id: number;
  }): Promise<SendTransactionReceiptResponse | any> {
    return this.post<SendTransactionReceiptResponse>('/transaction/send_receipt', data);
  }
}
