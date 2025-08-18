import { BalanceService } from '../../src/services/balance.service';

describe('BalanceService', () => {
  let service: BalanceService;

  beforeEach(() => {
    service = new BalanceService({
      secretKey: 'test-secret-key',
      baseUrl: 'https://api.paystack.co',
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('check', () => {
    it('should call get with correct endpoint', async () => {
      const mockResponse = { 
        status: true, 
        message: 'Success', 
        data: [
          {
            currency: 'NGN',
            balance: 10000,
            available_balance: 9500,
            ledger_balance: 10000,
          }
        ] 
      };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.check();

      expect(service['get']).toHaveBeenCalledWith('/balance');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('listLedger', () => {
    it('should call get with correct endpoint and params', async () => {
      const params = { page: 1, perPage: 10, from: '2024-01-01', to: '2024-01-31' };
      const mockResponse = { status: true, message: 'Success', data: [] };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.listLedger(params);

      expect(service['get']).toHaveBeenCalledWith('/balance/ledger', params);
      expect(result).toEqual(mockResponse);
    });

    it('should call get without params when none provided', async () => {
      const mockResponse = { status: true, message: 'Success', data: [] };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.listLedger();

      expect(service['get']).toHaveBeenCalledWith('/balance/ledger', undefined);
      expect(result).toEqual(mockResponse);
    });
  });
});
