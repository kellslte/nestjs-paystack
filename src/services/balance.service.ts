import {
  CheckBalanceResponse,
  ListLedgerRequest,
  ListLedgerResponse,
} from 'src/interfaces/balance.interface';
import { BaseService } from '../base.service';
import { PaystackModuleOptions } from '../interfaces';

export class BalanceService extends BaseService {
  constructor(options: PaystackModuleOptions) {
    super(options);
  }

  async check(): Promise<CheckBalanceResponse | any> {
    return this.get<CheckBalanceResponse>('/balance');
  }

  async listLedger(params?: ListLedgerRequest): Promise<ListLedgerResponse | any> {
    return this.get<ListLedgerResponse>('/balance/ledger', params);
  }
}
