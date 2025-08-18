import { SubscriptionService } from '../../src/services/subscription.service';

describe('SubscriptionService', () => {
  let service: SubscriptionService;

  beforeEach(() => {
    service = new SubscriptionService({
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
        customer: 'CUS_123',
        plan: 'PLAN_456',
        authorization: 'AUTH_789',
        start_date: '2024-01-01',
      };

      const mockResponse = { status: true, message: 'Success', data: {} };
      
      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.create(mockData);

      expect(service['post']).toHaveBeenCalledWith('/subscription', mockData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('list', () => {
    it('should call get with correct endpoint and params', async () => {
      const params = { page: 1, perPage: 10, customer: 123 };
      const mockResponse = { status: true, message: 'Success', data: [] };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.list(params);

      expect(service['get']).toHaveBeenCalledWith('/subscription', params);
      expect(result).toEqual(mockResponse);
    });

    it('should call get without params when none provided', async () => {
      const mockResponse = { status: true, message: 'Success', data: [] };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.list();

      expect(service['get']).toHaveBeenCalledWith('/subscription', undefined);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('fetch', () => {
    it('should call get with correct endpoint', async () => {
      const id = 123;
      const mockResponse = { status: true, message: 'Success', data: {} };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.fetch(id);

      expect(service['get']).toHaveBeenCalledWith('/subscription/123');
      expect(result).toEqual(mockResponse);
    });

    it('should handle string code', async () => {
      const code = 'SUB_123';
      const mockResponse = { status: true, message: 'Success', data: {} };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.fetch(code);

      expect(service['get']).toHaveBeenCalledWith('/subscription/SUB_123');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('activate', () => {
    it('should call post with correct endpoint and data', async () => {
      const id = 123;
      const activationData = {
        code: 'ACTIVATION_CODE',
        token: 'ACTIVATION_TOKEN',
      };

      const mockResponse = { status: true, message: 'Success', data: {} };
      
      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.activate(id, activationData);

      expect(service['post']).toHaveBeenCalledWith('/subscription/activate/123', activationData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('cancel', () => {
    it('should call post with correct endpoint', async () => {
      const id = 123;
      const mockResponse = { status: true, message: 'Success', data: {} };
      
      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.cancel(id);

      expect(service['post']).toHaveBeenCalledWith('/subscription/disable/123');
      expect(result).toEqual(mockResponse);
    });
  });
});
