import { BaseService } from '../base.service';
import {
    ActivateSubscriptionRequest,
    ActivateSubscriptionResponse,
    CancelSubscriptionResponse,
    CreateSubscriptionRequest,
    CreateSubscriptionResponse,
    FetchSubscriptionResponse,
    ListSubscriptionsRequest,
    ListSubscriptionsResponse,
    PaystackModuleOptions
} from '../interfaces';

export class SubscriptionService extends BaseService {
    constructor(options: PaystackModuleOptions) {
        super(options);
    }

    async create(data: CreateSubscriptionRequest): Promise<CreateSubscriptionResponse | any> {
        return this.post<CreateSubscriptionResponse>('/subscription', data);
    }

    async list(params?: ListSubscriptionsRequest): Promise<ListSubscriptionsResponse | any> {
        return this.get<ListSubscriptionsResponse>('/subscription', params);
    }

    async fetch(idOrCode: string | number): Promise<FetchSubscriptionResponse | any> {
        return this.get<FetchSubscriptionResponse>(`/subscription/${idOrCode}`);
    }

    async activate(idOrCode: string | number, data: ActivateSubscriptionRequest): Promise<ActivateSubscriptionResponse | any> {
        return this.post<ActivateSubscriptionResponse>(`/subscription/activate/${idOrCode}`, data);
    }

    async cancel(idOrCode: string | number): Promise<CancelSubscriptionResponse | any> {
        return this.post<CancelSubscriptionResponse>(`/subscription/disable/${idOrCode}`);
    }
}
