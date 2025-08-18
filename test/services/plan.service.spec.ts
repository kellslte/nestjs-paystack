import { PlanService } from '../../src/services/plan.service';

describe('PlanService', () => {
  let service: PlanService;

  beforeEach(() => {
    service = new PlanService({
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
        name: 'Test Plan',
        amount: 1000,
        interval: 'monthly' as const,
        description: 'Test description',
        currency: 'NGN',
      };

      const mockResponse = { status: true, message: 'Success', data: {} };
      
      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.create(mockData);

      expect(service['post']).toHaveBeenCalledWith('/plan', mockData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('list', () => {
    it('should call get with correct endpoint and params', async () => {
      const params = { page: 1, perPage: 10, status: 'active' };
      const mockResponse = { status: true, message: 'Success', data: [] };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.list(params);

      expect(service['get']).toHaveBeenCalledWith('/plan', params);
      expect(result).toEqual(mockResponse);
    });

    it('should call get without params when none provided', async () => {
      const mockResponse = { status: true, message: 'Success', data: [] };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.list();

      expect(service['get']).toHaveBeenCalledWith('/plan', undefined);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('fetch', () => {
    it('should call get with correct endpoint', async () => {
      const id = 123;
      const mockResponse = { status: true, message: 'Success', data: {} };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.fetch(id);

      expect(service['get']).toHaveBeenCalledWith('/plan/123');
      expect(result).toEqual(mockResponse);
    });

    it('should handle string code', async () => {
      const code = 'PLAN_123';
      const mockResponse = { status: true, message: 'Success', data: {} };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.fetch(code);

      expect(service['get']).toHaveBeenCalledWith('/plan/PLAN_123');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('update', () => {
    it('should call put with correct endpoint and data', async () => {
      const id = 123;
      const updateData = {
        name: 'Updated Plan',
        amount: 2000,
        description: 'Updated description',
      };

      const mockResponse = { status: true, message: 'Success', data: {} };
      
      jest.spyOn(service as any, 'put').mockResolvedValue(mockResponse);

      const result = await service.update(id, updateData);

      expect(service['put']).toHaveBeenCalledWith('/plan/123', updateData);
      expect(result).toEqual(mockResponse);
    });
  });
});
