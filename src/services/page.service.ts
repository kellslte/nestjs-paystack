import { BaseService } from '../base.service';
import {
    CheckSlugAvailabilityResponse,
    CreatePageRequest,
    CreatePageResponse,
    FetchPageResponse,
    ListPagesRequest,
    ListPagesResponse,
    PaystackModuleOptions,
    UpdatePageRequest,
    UpdatePageResponse
} from '../interfaces';

export class PageService extends BaseService {
    constructor(options: PaystackModuleOptions) {
        super(options);
    }

    async create(data: CreatePageRequest): Promise<CreatePageResponse | any> {
        return this.post<CreatePageResponse>('/page', data);
    }

    async list(params?: ListPagesRequest): Promise<ListPagesResponse | any> {
        return this.get<ListPagesResponse>('/page', params);
    }

    async fetch(idOrSlug: string | number): Promise<FetchPageResponse | any> {
        return this.get<FetchPageResponse>(`/page/${idOrSlug}`);
    }

    async update(idOrSlug: string | number, data: UpdatePageRequest): Promise<UpdatePageResponse | any> {
        return this.put<UpdatePageResponse>(`/page/${idOrSlug}`, data);
    }

    async checkSlug(slug: string): Promise<CheckSlugAvailabilityResponse | any> {
        return this.get<CheckSlugAvailabilityResponse>(`/page/check_slug_availability/${slug}`);
    }
}
