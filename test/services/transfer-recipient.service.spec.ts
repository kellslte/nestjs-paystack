import { TransferRecipientService } from '../../src/services/transfer-recipient.service';

describe('TransferRecipientService', () => {
  let service: TransferRecipientService;

  beforeEach(() => {
    service = new TransferRecipientService({
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
        type: 'nuban' as const,
        name: 'John Doe',
        account_number: '1234567890',
        bank_code: '044',
        currency: 'NGN',
        description: 'Test recipient',
        metadata: { source: 'test' },
      };

      const mockResponse = { status: true, message: 'Success', data: {} };

      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.create(mockData);

      expect(service['post']).toHaveBeenCalledWith('/transferrecipient', mockData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('list', () => {
    it('should call get with correct endpoint and params', async () => {
      const params = { page: 1, perPage: 10 };
      const mockResponse = { status: true, message: 'Success', data: [] };

      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.list(params);

      expect(service['get']).toHaveBeenCalledWith('/transferrecipient', params);
      expect(result).toEqual(mockResponse);
    });

    it('should call get without params when none provided', async () => {
      const mockResponse = { status: true, message: 'Success', data: [] };

      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.list();

      expect(service['get']).toHaveBeenCalledWith('/transferrecipient', undefined);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('fetch', () => {
    it('should call get with correct endpoint for numeric id', async () => {
      const id = 123;
      const mockResponse = { status: true, message: 'Success', data: {} };

      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.fetch(id);

      expect(service['get']).toHaveBeenCalledWith('/transferrecipient/123');
      expect(result).toEqual(mockResponse);
    });

    it('should handle string code', async () => {
      const code = 'RECIPIENT_123';
      const mockResponse = { status: true, message: 'Success', data: {} };

      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.fetch(code);

      expect(service['get']).toHaveBeenCalledWith('/transferrecipient/RECIPIENT_123');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('update', () => {
    it('should call put with correct endpoint and data', async () => {
      const id = 123;
      const updateData = {
        name: 'Updated Name',
        email: 'updated@example.com',
        metadata: { updated: true },
      };

      const mockResponse = { status: true, message: 'Success', data: {} };

      jest.spyOn(service as any, 'put').mockResolvedValue(mockResponse);

      const result = await service.update(id, updateData);

      expect(service['put']).toHaveBeenCalledWith('/transferrecipient/123', updateData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('remove', () => {
    it('should call delete with correct endpoint', async () => {
      const id = 123;
      const mockResponse = { status: true, message: 'Success', data: null };

      jest.spyOn(service as any, 'delete').mockResolvedValue(mockResponse);

      const result = await service.remove(id);

      expect(service['delete']).toHaveBeenCalledWith('/transferrecipient/123');
      expect(result).toEqual(mockResponse);
    });

    it('should handle string code', async () => {
      const code = 'RECIPIENT_123';
      const mockResponse = { status: true, message: 'Success', data: null };

      jest.spyOn(service as any, 'delete').mockResolvedValue(mockResponse);

      const result = await service.remove(code);

      expect(service['delete']).toHaveBeenCalledWith('/transferrecipient/RECIPIENT_123');
      expect(result).toEqual(mockResponse);
    });
  });
});
