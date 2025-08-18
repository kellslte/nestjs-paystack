import { PageService } from '../../src/services/page.service';

describe('PageService', () => {
  let service: PageService;

  beforeEach(() => {
    service = new PageService({
      secretKey: 'test-secret-key',
      baseUrl: 'https://api.paystack.co',
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should call post with correct endpoint and data', async () => {
      const mockData = {
        name: 'Test Page',
        description: 'Test description',
        amount: 1000,
        slug: 'test-page',
        redirect_url: 'https://example.com/redirect',
        custom_fields: [
          {
            display_name: 'Customer Name',
            variable_name: 'customer_name',
            value: 'Required',
          },
        ],
        metadata: { source: 'test' },
      };

      const mockResponse = { status: true, message: 'Success', data: {} };
      
      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.create(mockData);

      expect(service['post']).toHaveBeenCalledWith('/page', mockData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('list', () => {
    it('should call get with correct endpoint and params', async () => {
      const params = { page: 1, perPage: 10, active: true };
      const mockResponse = { status: true, message: 'Success', data: [] };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.list(params);

      expect(service['get']).toHaveBeenCalledWith('/page', params);
      expect(result).toEqual(mockResponse);
    });

    it('should call get without params when none provided', async () => {
      const mockResponse = { status: true, message: 'Success', data: [] };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.list();

      expect(service['get']).toHaveBeenCalledWith('/page', undefined);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('fetch', () => {
    it('should call get with correct endpoint for numeric id', async () => {
      const id = 123;
      const mockResponse = { status: true, message: 'Success', data: {} };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.fetch(id);

      expect(service['get']).toHaveBeenCalledWith('/page/123');
      expect(result).toEqual(mockResponse);
    });

    it('should handle string slug', async () => {
      const slug = 'test-page';
      const mockResponse = { status: true, message: 'Success', data: {} };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.fetch(slug);

      expect(service['get']).toHaveBeenCalledWith('/page/test-page');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('update', () => {
    it('should call put with correct endpoint and data', async () => {
      const id = 123;
      const updateData = {
        name: 'Updated Page',
        description: 'Updated description',
        amount: 2000,
        active: false,
        redirect_url: 'https://example.com/new-redirect',
      };

      const mockResponse = { status: true, message: 'Success', data: {} };
      
      jest.spyOn(service as any, 'put').mockResolvedValue(mockResponse);

      const result = await service.update(id, updateData);

      expect(service['put']).toHaveBeenCalledWith('/page/123', updateData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('checkSlug', () => {
    it('should call get with correct endpoint', async () => {
      const slug = 'test-page';
      const mockResponse = { status: true, message: 'Success', data: { available: true } };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.checkSlug(slug);

      expect(service['get']).toHaveBeenCalledWith('/page/check_slug_availability/test-page');
      expect(result).toEqual(mockResponse);
    });
  });
});
