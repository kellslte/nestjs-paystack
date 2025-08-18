import { BaseService } from '../base.service';
import { PaystackModuleOptions } from '../interfaces';
import {
  InitializeTransactionResponse,
  VerifyTransactionResponse,
  ListTransactionsResponse,
} from '../interfaces/transaction.interface';

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
  }): Promise<InitializeTransactionResponse | any> {
    return this.post<InitializeTransactionResponse>('/transfer', data);
  }

  async list(params?: {
    page?: number;
    perPage?: number;
    customer?: number;
    status?: string;
    from?: string;
    to?: string;
  }): Promise<ListTransactionsResponse> {
    return this.get<ListTransactionsResponse>('/transfer', params);
  }

  async fetch(idOrCode: string | number): Promise<any> {
    return this.get<any>(`/transfer/${idOrCode}`);
  }

  async finalize(data: {
    transfer_code: string;
    otp: string;
  }): Promise<any> {
    return this.post<any>('/transfer/finalize_transfer', data);
  }

  async verify(reference: string): Promise<VerifyTransactionResponse> {
    return this.get<VerifyTransactionResponse>(`/transfer/verify/${reference}`);
  }
}
