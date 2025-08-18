import { SplitService } from '../../src/services/split.service';

describe('SplitService', () => {
  let service: SplitService;

  beforeEach(() => {
    service = new SplitService({
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
        name: 'Test Split',
        type: 'percentage' as const,
        currency: 'NGN',
        subaccounts: [
          { subaccount: 'SUB_123', share: 50 },
          { subaccount: 'SUB_456', share: 50 },
        ],
        bearer_type: 'account' as const,
      };

      const mockResponse = { status: true, message: 'Success', data: {} };
      
      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.create(mockData);

      expect(service['post']).toHaveBeenCalledWith('/split', mockData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('list', () => {
    it('should call get with correct endpoint and params', async () => {
      const params = { page: 1, perPage: 10, active: true };
      const mockResponse = { status: true, message: 'Success', data: [] };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.list(params);

      expect(service['get']).toHaveBeenCalledWith('/split', params);
      expect(result).toEqual(mockResponse);
    });

    it('should call get without params when none provided', async () => {
      const mockResponse = { status: true, message: 'Success', data: [] };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.list();

      expect(service['get']).toHaveBeenCalledWith('/split', undefined);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('fetch', () => {
    it('should call get with correct endpoint', async () => {
      const id = 123;
      const mockResponse = { status: true, message: 'Success', data: {} };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.fetch(id);

      expect(service['get']).toHaveBeenCalledWith('/split/123');
      expect(result).toEqual(mockResponse);
    });

    it('should handle string code', async () => {
      const code = 'SPLIT_123';
      const mockResponse = { status: true, message: 'Success', data: {} };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.fetch(code);

      expect(service['get']).toHaveBeenCalledWith('/split/SPLIT_123');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('update', () => {
    it('should call put with correct endpoint and data', async () => {
      const id = 123;
      const updateData = {
        name: 'Updated Split',
        active: false,
        subaccounts: [
          { subaccount: 'SUB_789', share: 100 },
        ],
        bearer_type: 'subaccount' as const,
        bearer_subaccount: 'SUB_789',
      };

      const mockResponse = { status: true, message: 'Success', data: {} };
      
      jest.spyOn(service as any, 'put').mockResolvedValue(mockResponse);

      const result = await service.update(id, updateData);

      expect(service['put']).toHaveBeenCalledWith('/split/123', updateData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('addSubaccount', () => {
    it('should call post with correct endpoint and data', async () => {
      const id = 123;
      const subaccountData = {
        subaccount: 'SUB_789',
        share: 25,
      };

      const mockResponse = { status: true, message: 'Success', data: {} };
      
      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.addSubaccount(id, subaccountData);

      expect(service['post']).toHaveBeenCalledWith('/split/123/subaccount/add', subaccountData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('removeSubaccount', () => {
    it('should call post with correct endpoint and data', async () => {
      const id = 123;
      const removeData = {
        subaccount: 'SUB_789',
      };

      const mockResponse = { status: true, message: 'Success', data: {} };
      
      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.removeSubaccount(id, removeData);

      expect(service['post']).toHaveBeenCalledWith('/split/123/subaccount/remove', removeData);
      expect(result).toEqual(mockResponse);
    });
  });
});
