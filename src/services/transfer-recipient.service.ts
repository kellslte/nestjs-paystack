import { BaseService } from '../base.service';
import {
  CreateTransferRecipientRequest,
  CreateTransferRecipientResponse,
  DeleteTransferRecipientResponse,
  FetchTransferRecipientResponse,
  ListTransferRecipientsRequest,
  ListTransferRecipientsResponse,
  PaystackModuleOptions,
  UpdateTransferRecipientRequest,
  UpdateTransferRecipientResponse
} from '../interfaces';

export class TransferRecipientService extends BaseService {
  constructor(options: PaystackModuleOptions) {
    super(options);
  }

  async create(data: CreateTransferRecipientRequest): Promise<CreateTransferRecipientResponse | any> {
    return this.post<CreateTransferRecipientResponse>('/transferrecipient', data);
  }

  async list(params?: ListTransferRecipientsRequest): Promise<ListTransferRecipientsResponse | any> {
    return this.get<ListTransferRecipientsResponse>('/transferrecipient', params);
  }

  async fetch(idOrCode: string | number): Promise<FetchTransferRecipientResponse | any> {
    return this.get<FetchTransferRecipientResponse>(`/transferrecipient/${idOrCode}`);
  }

  async update(idOrCode: string | number, data: UpdateTransferRecipientRequest): Promise<UpdateTransferRecipientResponse | any> {
    return this.put<UpdateTransferRecipientResponse>(`/transferrecipient/${idOrCode}`, data);
  }

  async delete(idOrCode: string | number): Promise<DeleteTransferRecipientResponse | any> {
    return this.delete(`/transferrecipient/${idOrCode}`);
  }
}
