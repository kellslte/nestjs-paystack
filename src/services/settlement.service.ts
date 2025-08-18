import { BaseService } from '../base.service';
import {
  FetchSettlementResponse,
  ListSettlementsRequest,
  ListSettlementsResponse,
  PaystackModuleOptions,
} from '../interfaces';

export class SettlementService extends BaseService {
  constructor(options: PaystackModuleOptions) {
    super(options);
  }

  async list(params?: ListSettlementsRequest): Promise<ListSettlementsResponse | any> {
    return this.get<ListSettlementsResponse>('/settlement', params);
  }

  async fetch(id: number): Promise<FetchSettlementResponse | any> {
    return this.get<FetchSettlementResponse>(`/settlement/${id}`);
  }
}
