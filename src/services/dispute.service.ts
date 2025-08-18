import { BaseService } from '../base.service';
import { 
  AddEvidenceRequest, 
  AddEvidenceResponse, 
  FetchDisputeResponse, 
  ListDisputesRequest, 
  ListDisputesResponse, 
  PaystackModuleOptions, 
  UpdateDisputeRequest, 
  UpdateDisputeResponse,
  UploadEvidenceRequest,
  UploadEvidenceResponse,
} from '../interfaces';

export class DisputeService extends BaseService {
  constructor(options: PaystackModuleOptions) {
    super(options);
  }

  async list(params?: ListDisputesRequest): Promise<ListDisputesResponse | any> {
    return this.get<ListDisputesResponse>('/dispute', params);
  }

  async fetch(id: number): Promise<FetchDisputeResponse | any> {
    return this.get<FetchDisputeResponse>(`/dispute/${id}`);
  }

  async update(id: number, data: UpdateDisputeRequest): Promise<UpdateDisputeResponse | any> {
    return this.put<UpdateDisputeResponse>(`/dispute/${id}`, data);
  }

  async addEvidence(id: number, data: AddEvidenceRequest): Promise<AddEvidenceResponse | any> {
    return this.post<AddEvidenceResponse>(`/dispute/${id}/evidence`, data);
  }

  async uploadEvidence(id: number, data: UploadEvidenceRequest): Promise<UploadEvidenceResponse | any> {
    return this.post<UploadEvidenceResponse>(`/dispute/${id}/evidence/upload`, data);
  }
}
