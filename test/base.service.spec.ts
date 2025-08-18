import { BaseService } from '../src/base.service';
import { HttpClient } from '../src/http-client';

// Create a concrete implementation of BaseService for testing
class TestService extends BaseService {
  async testGet(endpoint: string, params?: Record<string, any>) {
    return this.get(endpoint, params);
  }

  async testPost(endpoint: string, data?: any) {
    return this.post(endpoint, data);
  }

  async testPut(endpoint: string, data?: any) {
    return this.put(endpoint, data);
  }

  async testDelete(endpoint: string) {
    return this.delete(endpoint);
  }
}

// Mock HttpClient
jest.mock('../src/http-client');

describe('BaseService', () => {
  let service: TestService;
  let mockHttpClient: jest.Mocked<HttpClient>;

  beforeEach(() => {
    jest.clearAllMocks();

    service = new TestService({
      secretKey: 'test-secret-key',
      baseUrl: 'https://api.paystack.co',
      timeout: 30000,
      retries: 3,
      retryDelay: 1000,
      maxRetryDelay: 10000,
    });

    mockHttpClient = service['httpClient'] as jest.Mocked<HttpClient>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getBaseUrl', () => {
    it('should return configured base URL', () => {
      const baseUrl = service['getBaseUrl']();
      expect(baseUrl).toBe('https://api.paystack.co');
    });

    it('should return default base URL when not configured', () => {
      const serviceWithoutBaseUrl = new TestService({
        secretKey: 'test-secret-key',
      });

      const baseUrl = serviceWithoutBaseUrl['getBaseUrl']();
      expect(baseUrl).toBe('https://api.paystack.co');
    });
  });

  describe('getHeaders', () => {
    it('should return correct headers', () => {
      const headers = service['getHeaders']();

      expect(headers).toEqual({
        'Authorization': 'Bearer test-secret-key',
        'Content-Type': 'application/json',
      });
    });
  });

  describe('getRetryOptions', () => {
    it('should return configured retry options', () => {
      const retryOptions = service['getRetryOptions']();

      expect(retryOptions).toEqual({
        retries: 3,
        retryDelay: 1000,
        maxRetryDelay: 10000,
      });
    });

    it('should return default retry options when not configured', () => {
      const serviceWithDefaults = new TestService({
        secretKey: 'test-secret-key',
      });

      const retryOptions = serviceWithDefaults['getRetryOptions']();

      expect(retryOptions).toEqual({
        retries: 3,
        retryDelay: 1000,
        maxRetryDelay: 10000,
      });
    });
  });

  describe('get', () => {
    it('should call httpClient.request with correct parameters', async () => {
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { success: true }
      };
      mockHttpClient.request.mockResolvedValue(mockResponse);

      const result = await service.testGet('/test', { param: 'value' });

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        {
          method: 'GET',
          url: 'https://api.paystack.co/test?param=value',
          headers: {
            'Authorization': 'Bearer test-secret-key',
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        },
        {
          retries: 3,
          retryDelay: 1000,
          maxRetryDelay: 10000,
        }
      );
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle URL building with params', async () => {
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { success: true }
      };
      mockHttpClient.request.mockResolvedValue(mockResponse);

      await service.testGet('/test', {
        param1: 'value1',
        param2: 'value2',
        param3: undefined,
        param4: null
      });

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'https://api.paystack.co/test?param1=value1&param2=value2',
        }),
        expect.any(Object)
      );
    });
  });

  describe('post', () => {
    it('should call httpClient.request with correct parameters', async () => {
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { success: true }
      };
      mockHttpClient.request.mockResolvedValue(mockResponse);

      const postData = { name: 'test', value: 123 };
      const result = await service.testPost('/test', postData);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        {
          method: 'POST',
          url: 'https://api.paystack.co/test',
          headers: {
            'Authorization': 'Bearer test-secret-key',
            'Content-Type': 'application/json',
          },
          body: postData,
          timeout: 30000,
        },
        {
          retries: 3,
          retryDelay: 1000,
          maxRetryDelay: 10000,
        }
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('put', () => {
    it('should call httpClient.request with correct parameters', async () => {
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { success: true }
      };
      mockHttpClient.request.mockResolvedValue(mockResponse);

      const putData = { name: 'updated', value: 456 };
      const result = await service.testPut('/test', putData);

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        {
          method: 'PUT',
          url: 'https://api.paystack.co/test',
          headers: {
            'Authorization': 'Bearer test-secret-key',
            'Content-Type': 'application/json',
          },
          body: putData,
          timeout: 30000,
        },
        {
          retries: 3,
          retryDelay: 1000,
          maxRetryDelay: 10000,
        }
      );
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('delete', () => {
    it('should call httpClient.request with correct parameters', async () => {
      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        data: { success: true }
      };
      mockHttpClient.request.mockResolvedValue(mockResponse);

      const result = await service.testDelete('/test');

      expect(mockHttpClient.request).toHaveBeenCalledWith(
        {
          method: 'DELETE',
          url: 'https://api.paystack.co/test',
          headers: {
            'Authorization': 'Bearer test-secret-key',
            'Content-Type': 'application/json',
          },
          timeout: 30000,
        },
        {
          retries: 3,
          retryDelay: 1000,
          maxRetryDelay: 10000,
        }
      );
      expect(result).toEqual(mockResponse.data);
    });
  });
});
