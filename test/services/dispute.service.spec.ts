import { DisputeService } from '../../src/services/dispute.service';

describe('DisputeService', () => {
  let service: DisputeService;

  beforeEach(() => {
    service = new DisputeService({
      secretKey: 'test-secret-key',
      baseUrl: 'https://api.paystack.co',
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('list', () => {
    it('should call get with correct endpoint and params', async () => {
      const params = {
        page: 1,
        perPage: 10,
        from: '2024-01-01',
        to: '2024-01-31',
        status: 'pending',
        transaction: 123,
      };
      const mockResponse = { status: true, message: 'Success', data: [] };

      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.list(params);

      expect(service['get']).toHaveBeenCalledWith('/dispute', params);
      expect(result).toEqual(mockResponse);
    });

    it('should call get without params when none provided', async () => {
      const mockResponse = { status: true, message: 'Success', data: [] };

      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.list();

      expect(service['get']).toHaveBeenCalledWith('/dispute', undefined);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('fetch', () => {
    it('should call get with correct endpoint', async () => {
      const id = 123;
      const mockResponse = { status: true, message: 'Success', data: {} };

      jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

      const result = await service.fetch(id);

      expect(service['get']).toHaveBeenCalledWith('/dispute/123');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('update', () => {
    it('should call put with correct endpoint and data', async () => {
      const id = 123;
      const updateData = {
        refund_amount: 500,
        resolution: 'merchant-accepted' as const,
        reason: 'Customer satisfied with resolution',
      };

      const mockResponse = { status: true, message: 'Success', data: {} };

      jest.spyOn(service as any, 'put').mockResolvedValue(mockResponse);

      const result = await service.update(id, updateData);

      expect(service['put']).toHaveBeenCalledWith('/dispute/123', updateData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('addEvidence', () => {
    it('should call post with correct endpoint and data', async () => {
      const id = 123;
      const evidenceData = {
        customer_email: 'customer@example.com',
        customer_name: 'John Doe',
        customer_phone: '08012345678',
        service_details: 'Product delivery completed',
        delivery_address: '123 Test Street',
        delivery_date: '2024-01-15',
        delivery_confirmation: 'Signed by customer',
        customer_signature: 'John Doe',
      };

      const mockResponse = { status: true, message: 'Success', data: {} };

      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.addEvidence(id, evidenceData);

      expect(service['post']).toHaveBeenCalledWith('/dispute/123/evidence', evidenceData);
      expect(result).toEqual(mockResponse);
    });
  });

  describe('uploadEvidence', () => {
    it('should call post with correct endpoint and data', async () => {
      const id = 123;
      const uploadData = {
        filename: 'delivery_proof.pdf',
        url: 'https://example.com/delivery_proof.pdf',
      };

      const mockResponse = { status: true, message: 'Success', data: {} };

      jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

      const result = await service.uploadEvidence(id, uploadData);

      expect(service['post']).toHaveBeenCalledWith('/dispute/123/evidence/upload', uploadData);
      expect(result).toEqual(mockResponse);
    });
  });
});
