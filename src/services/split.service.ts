import { BaseService } from '../base.service';
import {
  CreateSplitRequest,
  CreateSplitResponse,
  FetchSplitResponse,
  ListSplitsRequest,
  ListSplitsResponse,
  PaystackModuleOptions,
  UpdateSplitRequest,
  UpdateSplitResponse,
  AddSubaccountToSplitRequest,
  AddSubaccountToSplitResponse,
  RemoveSubaccountFromSplitRequest,
  RemoveSubaccountFromSplitResponse,
} from '../interfaces';

export class SplitService extends BaseService {
  constructor(options: PaystackModuleOptions) {
    super(options);
  }

  async create(data: CreateSplitRequest): Promise<CreateSplitResponse | any> {
    return this.post<CreateSplitResponse>('/split', data);
  }

  async list(params?: ListSplitsRequest): Promise<ListSplitsResponse | any> {
    return this.get<ListSplitsResponse>('/split', params);
  }

  async fetch(idOrCode: string | number): Promise<FetchSplitResponse | any> {
    return this.get<FetchSplitResponse>(`/split/${idOrCode}`);
  }

  async update(
    idOrCode: string | number,
    data: UpdateSplitRequest,
  ): Promise<UpdateSplitResponse | any> {
    return this.put<UpdateSplitResponse>(`/split/${idOrCode}`, data);
  }

  async addSubaccount(
    idOrCode: string | number,
    data: AddSubaccountToSplitRequest,
  ): Promise<AddSubaccountToSplitResponse | any> {
    return this.post<AddSubaccountToSplitResponse>(`/split/${idOrCode}/subaccount/add`, data);
  }

  async removeSubaccount(
    idOrCode: string | number,
    data: RemoveSubaccountFromSplitRequest,
  ): Promise<RemoveSubaccountFromSplitResponse | any> {
    return this.post<RemoveSubaccountFromSplitResponse>(
      `/split/${idOrCode}/subaccount/remove`,
      data,
    );
  }
}
