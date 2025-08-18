import { ChargeService } from '../../src/services/charge.service';

describe('ChargeService', () => {
  let service: ChargeService;

  beforeEach(() => {
    service = new ChargeService({
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
        email: 'test@example.com',
        amount: 1000,
        authorization_code: 'AUTH_123',
        reference: 'CHARGE_REF_123',
        metadata: { source: 'test' },
        card: {
          number: '4084084084084081',
          cvv: '408',
          expiry_month: '01',
          expiry_year: '99',
        },
      };

      const mockResponse = { status: true, message: 'Success', data: {} };

      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.create(mockData);

      expect(service['post']).toHaveBeenCalledWith('/charge', mockData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('submitPin', () => {
    it('should call post with correct endpoint and data', async () => {
      const pinData = {
        pin: '1234',
        reference: 'CHARGE_REF_123',
      };

      const mockResponse = { status: true, message: 'Success', data: {} };

      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.submitPin(pinData);

      expect(service['post']).toHaveBeenCalledWith('/charge/submit_pin', pinData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('submitOtp', () => {
    it('should call post with correct endpoint and data', async () => {
      const otpData = {
        otp: '123456',
        reference: 'CHARGE_REF_123',
      };

      const mockResponse = { status: true, message: 'Success', data: {} };

      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.submitOtp(otpData);

      expect(service['post']).toHaveBeenCalledWith('/charge/submit_otp', otpData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('submitPhone', () => {
    it('should call post with correct endpoint and data', async () => {
      const phoneData = {
        phone: '08012345678',
        reference: 'CHARGE_REF_123',
      };

      const mockResponse = { status: true, message: 'Success', data: {} };

      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.submitPhone(phoneData);

      expect(service['post']).toHaveBeenCalledWith('/charge/submit_phone', phoneData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('submitBirthday', () => {
    it('should call post with correct endpoint and data', async () => {
      const birthdayData = {
        birthday: '1990-01-01',
        reference: 'CHARGE_REF_123',
      };

      const mockResponse = { status: true, message: 'Success', data: {} };

      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.submitBirthday(birthdayData);

      expect(service['post']).toHaveBeenCalledWith('/charge/submit_birthday', birthdayData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('checkPending', () => {
    it('should call get with correct endpoint', async () => {
      const reference = 'CHARGE_REF_123';
      const mockResponse = { status: true, message: 'Success', data: {} };

      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.checkPending(reference);

      expect(service['get']).toHaveBeenCalledWith('/charge/CHARGE_REF_123');
      expect(result).toEqual(mockResponse);
    });
  });
});
