import { BaseService } from '../base.service';
import {
  CreatePlanRequest,
  CreatePlanResponse,
  FetchPlanResponse,
  ListPlansRequest,
  ListPlansResponse,
  PaystackModuleOptions,
  UpdatePlanRequest,
  UpdatePlanResponse,
} from '../interfaces';

export class PlanService extends BaseService {
  constructor(options: PaystackModuleOptions) {
    super(options);
  }

  /**
   * Create a plan
   */
  async create(data: CreatePlanRequest): Promise<CreatePlanResponse | any> {
    return this.post<CreatePlanResponse>('/plan', data);
  }

  /**
   * List plans
   */
  async list(params?: ListPlansRequest): Promise<ListPlansResponse | any> {
    return this.get<ListPlansResponse>('/plan', params);
  }

  /**
   * Fetch a plan
   */
  async fetch(idOrCode: string | number): Promise<FetchPlanResponse | any> {
    return this.get<FetchPlanResponse>(`/plan/${idOrCode}`);
  }

  /**
   * Update a plan
   */
  async update(
    idOrCode: string | number,
    data: UpdatePlanRequest,
  ): Promise<UpdatePlanResponse | any> {
    return this.put<UpdatePlanResponse>(`/plan/${idOrCode}`, data);
  }
}
