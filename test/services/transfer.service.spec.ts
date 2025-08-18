import { TransferService } from '../../src/services/transfer.service';

describe('TransferService', () => {
  let service: TransferService;

  beforeEach(() => {
    service = new TransferService({
      secretKey: 'test-secret-key',
      baseUrl: 'https://api.paystack.co',
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('initiate', () => {
    it('should call post with correct endpoint and data', async () => {
      const mockData = {
        source: 'balance' as const,
        amount: 1000,
        recipient: 'RECIPIENT_123',
        reason: 'Test transfer',
        currency: 'NGN',
        reference: 'TRANSFER_REF_123',
      };

      const mockResponse = { status: true, message: 'Success', data: {} };
      
      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.initiate(mockData);

      expect(service['post']).toHaveBeenCalledWith('/transfer', mockData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('list', () => {
    it('should call get with correct endpoint and params', async () => {
      const params = { page: 1, perPage: 10, customer: 123, status: 'success' };
      const mockResponse = { status: true, message: 'Success', data: [] };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.list(params);

      expect(service['get']).toHaveBeenCalledWith('/transfer', params);
      expect(result).toEqual(mockResponse);
    });

    it('should call get without params when none provided', async () => {
      const mockResponse = { status: true, message: 'Success', data: [] };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.list();

      expect(service['get']).toHaveBeenCalledWith('/transfer', undefined);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('fetch', () => {
    it('should call get with correct endpoint for numeric id', async () => {
      const id = 123;
      const mockResponse = { status: true, message: 'Success', data: {} };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.fetch(id);

      expect(service['get']).toHaveBeenCalledWith('/transfer/123');
      expect(result).toEqual(mockResponse);
    });

    it('should handle string code', async () => {
      const code = 'TRANSFER_123';
      const mockResponse = { status: true, message: 'Success', data: {} };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.fetch(code);

      expect(service['get']).toHaveBeenCalledWith('/transfer/TRANSFER_123');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('finalize', () => {
    it('should call post with correct endpoint and data', async () => {
      const finalizeData = {
        transfer_code: 'TRANSFER_123',
        otp: '123456',
      };

      const mockResponse = { status: true, message: 'Success', data: {} };
      
      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.finalize(finalizeData);

      expect(service['post']).toHaveBeenCalledWith('/transfer/finalize_transfer', finalizeData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('verify', () => {
    it('should call get with correct endpoint', async () => {
      const reference = 'TRANSFER_REF_123';
      const mockResponse = { status: true, message: 'Success', data: {} };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.verify(reference);

      expect(service['get']).toHaveBeenCalledWith('/transfer/verify/TRANSFER_REF_123');
      expect(result).toEqual(mockResponse);
    });
  });
});
