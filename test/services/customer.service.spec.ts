import { CustomerService } from '../../src/services/customer.service';

describe('CustomerService', () => {
    let service: CustomerService;

    beforeEach(() => {
        service = new CustomerService({
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
                first_name: 'John',
                last_name: 'Doe',
                phone: '08012345678',
                metadata: { source: 'test' },
            };

            const mockResponse = { status: true, message: 'Success', data: {} };

            jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

            const result = await service.create(mockData);

            expect(service['post']).toHaveBeenCalledWith('/customer', mockData);
            expect(result).toEqual(mockResponse);
        });

        it('should handle minimal data', async () => {
            const mockData = {
                email: 'test@example.com',
            };

            const mockResponse = { status: true, message: 'Success', data: {} };

            jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

            const result = await service.create(mockData);

            expect(service['post']).toHaveBeenCalledWith('/customer', mockData);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('list', () => {
        it('should call get with correct endpoint and params', async () => {
            const params = { page: 1, perPage: 10, from: '2024-01-01', to: '2024-01-31' };
            const mockResponse = { status: true, message: 'Success', data: [] };

            jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

            const result = await service.list(params);

            expect(service['get']).toHaveBeenCalledWith('/customer', params);
            expect(result).toEqual(mockResponse);
        });

        it('should call get without params when none provided', async () => {
            const mockResponse = { status: true, message: 'Success', data: [] };

            jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

            const result = await service.list();

            expect(service['get']).toHaveBeenCalledWith('/customer', undefined);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('fetch', () => {
        it('should call get with correct endpoint for numeric id', async () => {
            const id = 123;
            const mockResponse = { status: true, message: 'Success', data: {} };

            jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

            const result = await service.fetch(id);

            expect(service['get']).toHaveBeenCalledWith('/customer/123');
            expect(result).toEqual(mockResponse);
        });

        it('should handle string code', async () => {
            const code = 'CUS_123';
            const mockResponse = { status: true, message: 'Success', data: {} };

            jest.spyOn(service as any, 'get').mockResolvedValue(mockResponse);

            const result = await service.fetch(code);

            expect(service['get']).toHaveBeenCalledWith('/customer/CUS_123');
            expect(result).toEqual(mockResponse);
        });
    });

    describe('update', () => {
        it('should call put with correct endpoint and data', async () => {
            const id = 123;
            const updateData = {
                first_name: 'Jane',
                last_name: 'Smith',
                phone: '08087654321',
                metadata: { updated: true },
            };

            const mockResponse = { status: true, message: 'Success', data: {} };

            jest.spyOn(service as any, 'put').mockResolvedValue(mockResponse);

            const result = await service.update(id, updateData);

            expect(service['put']).toHaveBeenCalledWith('/customer/123', updateData);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('validate', () => {
        it('should call post with correct endpoint and data', async () => {
            const id = 123;
            const validationData = {
                first_name: 'John',
                last_name: 'Doe',
                type: 'bank_account' as const,
                value: '1234567890',
                country: 'NG',
                bvn: '12345678901',
                bank_code: '044',
                account_number: '1234567890',
                account_name: 'John Doe',
            };

            const mockResponse = { status: true, message: 'Success', data: {} };

            jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

            const result = await service.validate(id, validationData);

            expect(service['post']).toHaveBeenCalledWith('/customer/123/identification', validationData);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('blacklist', () => {
        it('should call post with correct endpoint and data', async () => {
            const id = 123;
            const riskData = {
                customer: 'CUS_123',
                risk_action: 'deny' as const,
            };

            const mockResponse = { status: true, message: 'Success', data: {} };

            jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

            const result = await service.blacklist(id, riskData);

            expect(service['post']).toHaveBeenCalledWith('/customer/set_risk_action', riskData);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('whitelist', () => {
        it('should call post with correct endpoint and data', async () => {
            const id = 123;
            const riskData = {
                customer: 'CUS_123',
                risk_action: 'allow' as const,
            };

            const mockResponse = { status: true, message: 'Success', data: {} };

            jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

            const result = await service.whitelist(id, riskData);

            expect(service['post']).toHaveBeenCalledWith('/customer/set_risk_action', riskData);
            expect(result).toEqual(mockResponse);
        });
    });

    describe('deactivateAuthorization', () => {
        it('should call post with correct endpoint and data', async () => {
            const authorizationCode = 'AUTH_123';

            const mockResponse = { status: true, message: 'Success', data: {} };

            jest.spyOn(service as any, 'post').mockResolvedValue(mockResponse);

            const result = await service.deactivateAuthorization(authorizationCode);

            expect(service['post']).toHaveBeenCalledWith('/customer/deactivate_authorization', {
                authorization_code: 'AUTH_123',
            });
            expect(result).toEqual(mockResponse);
        });
    });
});
