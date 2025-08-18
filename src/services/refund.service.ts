import { BaseService } from '../base.service';
import {
  CreateRefundRequest,
  CreateRefundResponse,
  FetchRefundResponse,
  ListRefundsRequest,
  ListRefundsResponse,
  PaystackModuleOptions,
} from '../interfaces';

export class RefundService extends BaseService {
  constructor(options: PaystackModuleOptions) {
    super(options);
  }

  async create(data: CreateRefundRequest): Promise<CreateRefundResponse | any> {
    return this.post<CreateRefundResponse>('/refund', data);
  }

  async list(params?: ListRefundsRequest): Promise<ListRefundsResponse | any> {
    return this.get<ListRefundsResponse>('/refund', params);
  }

  async fetch(id: number): Promise<FetchRefundResponse | any> {
    return this.get<FetchRefundResponse>(`/refund/${id}`);
  }
}
