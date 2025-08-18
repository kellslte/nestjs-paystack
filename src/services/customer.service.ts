import { BaseService } from '../base.service';
import {
  CreateCustomerRequest,
  CreateCustomerResponse,
  DeactivateAuthorizationResponse,
  FetchCustomerResponse,
  ListCustomersRequest,
  ListCustomersResponse,
  PaystackModuleOptions,
  UpdateCustomerRequest,
  UpdateCustomerResponse,
  ValidateCustomerResponse,
  ValidateCustomerRequest,
  SetRiskActionRequest,
  SetRiskActionResponse,
} from '../interfaces';
export class CustomerService extends BaseService {
  constructor(options: PaystackModuleOptions) {
    super(options);
  }

  /**
   * Create a customer
   */
  async create(data: CreateCustomerRequest): Promise<CreateCustomerResponse | any> {
    return this.post<CreateCustomerResponse>('/customer', data);
  }

  /**
   * List customers
   */
  async list(params?: ListCustomersRequest): Promise<ListCustomersResponse | any> {
    return this.get<ListCustomersResponse>('/customer', params);
  }

  /**
   * Fetch a customer
   */
  async fetch(idOrCode: string | number): Promise<FetchCustomerResponse | any> {
    return this.get<FetchCustomerResponse>(`/customer/${idOrCode}`);
  }

  /**
   * Update a customer
   */
  async update(
    idOrCode: string | number,
    data: UpdateCustomerRequest,
  ): Promise<UpdateCustomerResponse | any> {
    return this.put<UpdateCustomerResponse>(`/customer/${idOrCode}`, data);
  }

  /**
   * Validate a customer
   */
  async validate(
    idOrCode: string | number,
    data: ValidateCustomerRequest,
  ): Promise<ValidateCustomerResponse | any> {
    return this.post<ValidateCustomerResponse>(`/customer/${idOrCode}/identification`, data);
  }

  /**
   * Blacklist a customer
   */
  async blacklist(
    idOrCode: string | number,
    data: SetRiskActionRequest,
  ): Promise<SetRiskActionResponse> {
    return this.post<SetRiskActionResponse>(`/customer/set_risk_action`, data);
  }

  /**
   * Whitelist a customer
   */
  async whitelist(
    idOrCode: string | number,
    data: SetRiskActionRequest,
  ): Promise<SetRiskActionResponse> {
    return this.post<SetRiskActionResponse>(`/customer/set_risk_action`, data);
  }

  /**
   * Deactivate authorization
   */
  async deactivateAuthorization(
    authorizationCode: string,
  ): Promise<DeactivateAuthorizationResponse | any> {
    return this.post<DeactivateAuthorizationResponse>('/customer/deactivate_authorization', {
      authorization_code: authorizationCode,
    });
  }
}
