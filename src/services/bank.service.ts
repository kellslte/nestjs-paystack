import { BaseService } from '../base.service';
import { PaystackModuleOptions } from '../interfaces';
import {
  ListBankBranchesRequest,
  ListBankBranchesResponse,
  ListBanksRequest,
  ListBanksResponse,
} from '../interfaces/bank.interface';

export class BankService extends BaseService {
  constructor(options: PaystackModuleOptions) {
    super(options);
  }

  async listBanks(params?: ListBanksRequest): Promise<ListBanksResponse | any> {
    return this.get<ListBanksResponse>('/bank', params);
  }

  async listBranches(
    bankId: number,
    params?: ListBankBranchesRequest,
  ): Promise<ListBankBranchesResponse | any> {
    return this.get<ListBankBranchesResponse>(`/bank/${bankId}/branches`, params);
  }
}
