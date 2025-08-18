import { TransactionService } from '../../src/services/transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    service = new TransactionService({
      secretKey: 'test-secret-key',
      baseUrl: 'https://api.paystack.co',
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('initialize', () => {
    it('should call post with correct endpoint and data', async () => {
      const mockData = {
        amount: 1000,
        email: 'test@example.com',
        currency: 'NGN',
      };

      const mockResponse = { status: true, message: 'Success', data: {} };
      
      // Mock the post method
      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.initialize(mockData);

      expect(service['post']).toHaveBeenCalledWith('/transaction/initialize', mockData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('verify', () => {
    it('should call get with correct endpoint', async () => {
      const reference = 'test-reference';
      const mockResponse = { status: true, message: 'Success', data: {} };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.verify(reference);

      expect(service['get']).toHaveBeenCalledWith('/transaction/verify/test-reference');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('list', () => {
    it('should call get with correct endpoint and params', async () => {
      const params = { page: 1, perPage: 10 };
      const mockResponse = { status: true, message: 'Success', data: [] };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.list(params);

      expect(service['get']).toHaveBeenCalledWith('/transaction', params);
      expect(result).toEqual(mockResponse);
    });

    it('should call get without params when none provided', async () => {
      const mockResponse = { status: true, message: 'Success', data: [] };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.list();

      expect(service['get']).toHaveBeenCalledWith('/transaction', undefined);
      expect(result).toEqual(mockResponse);
    });
  });
});
