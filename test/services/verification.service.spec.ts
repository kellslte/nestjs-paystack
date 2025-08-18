import { VerificationService } from '../../src/services/verification.service';

describe('VerificationService', () => {
  let service: VerificationService;

  beforeEach(() => {
    service = new VerificationService({
      secretKey: 'test-secret-key',
      baseUrl: 'https://api.paystack.co',
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('verifyAccountNumber', () => {
    it('should call get with correct endpoint and params', async () => {
      const accountData = {
        account_number: '1234567890',
        account_code: '044',
      };

      const mockResponse = { 
        status: true, 
        message: 'Success', 
        data: {
          account_number: '1234567890',
          account_name: 'John Doe',
          bank_id: 1,
        }
      };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.verifyAccountNumber(accountData);

      expect(service['get']).toHaveBeenCalledWith('/bank/resolve', accountData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('verifyCardBin', () => {
    it('should call get with correct endpoint', async () => {
      const bin = '408408';
      const mockResponse = { 
        status: true, 
        message: 'Success', 
        data: {
          bin: '408408',
          brand: 'visa',
          sub_brand: '',
          country_code: 'NG',
          country_name: 'Nigeria',
          card_type: 'DEBIT',
          bank: 'Test Bank',
          linked_bank_id: 1,
        }
      };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.verifyCardBin(bin);

      expect(service['get']).toHaveBeenCalledWith('/decision/bin/408408');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('verifyBVN', () => {
    it('should call get with correct endpoint', async () => {
      const bvn = '12345678901';
      const mockResponse = { 
        status: true, 
        message: 'Success', 
        data: {
          bvn: '12345678901',
          first_name: 'John',
          last_name: 'Doe',
          date_of_birth: '1990-01-01',
          phone_number: '08012345678',
          registration_date: '2010-01-01',
          enrollment_bank: 'Test Bank',
          enrollment_branch: 'Test Branch',
          image: null,
        }
      };
      
      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.verifyBVN(bvn);

      expect(service['get']).toHaveBeenCalledWith('/bank/resolve_bvn/12345678901');
      expect(result).toEqual(mockResponse);
    });
  });
});
