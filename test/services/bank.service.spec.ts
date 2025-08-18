import { BankService } from '../../src/services/bank.service';

describe('BankService', () => {
  let service: BankService;

  beforeEach(() => {
    service = new BankService({
      secretKey: 'test-secret-key',
      baseUrl: 'https://api.paystack.co',
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listBanks', () => {
    it('should call get with correct endpoint and params', async () => {
      const params = {
        country: 'Nigeria',
        use_cursor: true,
        perPage: 10,
        pay_with_bank: true,
        gateway: 'emandate',
        type: 'nuban',
        currency: 'NGN'
      };
      const mockResponse = { status: true, message: 'Success', data: [] };

      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.listBanks(params);

      expect(service['get']).toHaveBeenCalledWith('/bank', params);
      expect(result).toEqual(mockResponse);
    });

    it('should call get without params when none provided', async () => {
      const mockResponse = { status: true, message: 'Success', data: [] };

      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.listBanks();

      expect(service['get']).toHaveBeenCalledWith('/bank', undefined);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('listBranches', () => {
    it('should call get with correct endpoint and params', async () => {
      const bankId = 123;
      const params = { page: 1, perPage: 10 };
      const mockResponse = { status: true, message: 'Success', data: [] };

      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.listBranches(bankId, params);

      expect(service['get']).toHaveBeenCalledWith('/bank/123/branches', params);
      expect(result).toEqual(mockResponse);
    });

    it('should call get without params when none provided', async () => {
      const bankId = 123;
      const mockResponse = { status: true, message: 'Success', data: [] };

      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.listBranches(bankId);

      expect(service['get']).toHaveBeenCalledWith('/bank/123/branches', undefined);
      expect(result).toEqual(mockResponse);
    });
  });
});
