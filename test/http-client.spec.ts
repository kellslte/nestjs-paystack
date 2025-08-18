import { HttpClient } from '../src/http-client';
import { PaystackError } from '../src/errors/paystack.error';

// Mock fetch globally
global.fetch = jest.fn();
global.AbortController = jest.fn().mockImplementation(() => ({
  signal: 'test-signal',
  abort: jest.fn(),
}));

describe('HttpClient', () => {
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = new HttpClient();
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(httpClient).toBeDefined();
  });

  describe('request', () => {
    const mockOptions = {
      method: 'GET' as const,
      url: 'https://api.paystack.co/test',
      headers: { 'Authorization': 'Bearer test' },
      timeout: 30000,
    };

    const mockRetryOptions = {
      retries: 2,
      retryDelay: 1000,
      maxRetryDelay: 5000,
    };

    it('should make a successful request on first attempt', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Map([['content-type', 'application/json']]),
        json: jest.fn().mockResolvedValue({ success: true }),
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await httpClient.request(mockOptions, mockRetryOptions);

      expect(result).toEqual({
        status: 200,
        statusText: 'OK',
        headers: { 'content-type': 'application/json' },
        data: { success: true },
      });
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it.skip('should retry on failure and succeed', async () => {
      const mockErrorResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        headers: new Map([['content-type', 'application/json']]),
        json: jest.fn().mockResolvedValue({ message: 'Server error' }),
      };

      const mockSuccessResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Map([['content-type', 'application/json']]),
        json: jest.fn().mockResolvedValue({ success: true }),
      };

      (global.fetch as jest.Mock)
        .mockResolvedValueOnce(mockErrorResponse)
        .mockResolvedValueOnce(mockSuccessResponse);

      const result = await httpClient.request(mockOptions, mockRetryOptions);

      expect(result).toEqual({
        status: 200,
        statusText: 'OK',
        headers: { 'content-type': 'application/json' },
        data: { success: true },
      });
      expect(global.fetch).toHaveBeenCalledTimes(2);
    }, 10000);

    it.skip('should throw PaystackError after max retries', async () => {
      const mockErrorResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        headers: new Map([['content-type', 'application/json']]),
        json: jest.fn().mockResolvedValue({ message: 'Server error' }),
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockErrorResponse);

      await expect(httpClient.request(mockOptions, { ...mockRetryOptions, retries: 1 }))
        .rejects
        .toThrow(PaystackError);

      expect(global.fetch).toHaveBeenCalledTimes(2); // Initial + 1 retry
    }, 10000);

    it('should not retry on non-retryable errors', async () => {
      const mockErrorResponse = {
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        headers: new Map([['content-type', 'application/json']]),
        json: jest.fn().mockResolvedValue({ message: 'Bad request' }),
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockErrorResponse);

      await expect(httpClient.request(mockOptions, mockRetryOptions))
        .rejects
        .toThrow(PaystackError);

      expect(global.fetch).toHaveBeenCalledTimes(1); // No retries
    });

    it('should use custom retry logic when provided', async () => {
      const customRetryOptions = {
        ...mockRetryOptions,
        shouldRetry: jest.fn().mockReturnValue(false),
      };

      const mockErrorResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        headers: new Map([['content-type', 'application/json']]),
        json: jest.fn().mockResolvedValue({ message: 'Server error' }),
      };

      (global.fetch as jest.Mock).mockResolvedValue(mockErrorResponse);

      await expect(httpClient.request(mockOptions, customRetryOptions))
        .rejects
        .toThrow(PaystackError);

      expect(customRetryOptions.shouldRetry).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledTimes(1); // No retries due to custom logic
    });
  });

  describe('parseResponse', () => {
    it('should parse JSON response', async () => {
      const mockResponse = {
        headers: new Map([['content-type', 'application/json']]),
        json: jest.fn().mockResolvedValue({ data: 'test' }),
      };

      const result = await httpClient['parseResponse'](mockResponse as any);
      expect(result).toEqual({ data: 'test' });
    });

    it('should parse text response', async () => {
      const mockResponse = {
        headers: new Map([['content-type', 'text/plain']]),
        text: jest.fn().mockResolvedValue('test text'),
      };

      const result = await httpClient['parseResponse'](mockResponse as any);
      expect(result).toEqual('test text');
    });

    it('should return empty object for unknown content type', async () => {
      const mockResponse = {
        headers: new Map([['content-type', 'unknown/type']]),
      };

      const result = await httpClient['parseResponse'](mockResponse as any);
      expect(result).toEqual({});
    });

    it('should handle JSON parse errors gracefully', async () => {
      const mockResponse = {
        headers: new Map([['content-type', 'application/json']]),
        json: jest.fn().mockRejectedValue(new Error('Parse error')),
      };

      const result = await httpClient['parseResponse'](mockResponse as any);
      expect(result).toEqual({});
    });
  });

  describe('parseHeaders', () => {
    it('should convert Headers to plain object', () => {
      const mockHeaders = new Map([
        ['content-type', 'application/json'],
        ['authorization', 'Bearer test'],
      ]);

      const result = httpClient['parseHeaders'](mockHeaders as any);
      expect(result).toEqual({
        'content-type': 'application/json',
        'authorization': 'Bearer test',
      });
    });
  });

  describe('createHttpError', () => {
    it('should create HttpError from PaystackError', () => {
      const paystackError = new PaystackError('Test error', 500, 'TEST_ERROR', { data: 'test' });

      const result = httpClient['createHttpError'](paystackError);

      expect(result).toEqual({
        status: 500,
        statusText: 'TEST_ERROR',
        message: 'Test error',
        data: { data: 'test' },
      });
    });

    it('should create HttpError from generic error', () => {
      const genericError = new Error('Generic error');

      const result = httpClient['createHttpError'](genericError);

      expect(result).toEqual({
        status: 0,
        statusText: 'UNKNOWN',
        message: 'Generic error',
        data: genericError,
      });
    });
  });

  describe('shouldRetry', () => {
    it('should return true for retryable status codes', () => {
      const retryableErrors = [
        { status: 408, message: 'timeout' },
        { status: 429, message: 'rate limit' },
        { status: 500, message: 'server error' },
        { status: 502, message: 'bad gateway' },
        { status: 503, message: 'service unavailable' },
        { status: 504, message: 'gateway timeout' },
      ];

      retryableErrors.forEach(error => {
        const result = httpClient['shouldRetry'](error as any, { retries: 1, retryDelay: 1000, maxRetryDelay: 5000 });
        expect(result).toBe(true);
      });
    });

    it('should return true for retryable error messages', () => {
      const retryableMessages = [
        'timeout',
        'network error',
        'connection failed',
        'server error occurred',
        'gateway timeout',
        'service unavailable',
      ];

      retryableMessages.forEach(message => {
        const error = { status: 200, message };
        const result = httpClient['shouldRetry'](error as any, { retries: 1, retryDelay: 1000, maxRetryDelay: 5000 });
        expect(result).toBe(true);
      });
    });

    it('should return false for non-retryable errors', () => {
      const nonRetryableErrors = [
        { status: 400, message: 'bad request' },
        { status: 401, message: 'unauthorized' },
        { status: 403, message: 'forbidden' },
        { status: 404, message: 'not found' },
      ];

      nonRetryableErrors.forEach(error => {
        const result = httpClient['shouldRetry'](error as any, { retries: 1, retryDelay: 1000, maxRetryDelay: 5000 });
        expect(result).toBe(false);
      });
    });
  });

  describe('calculateRetryDelay', () => {
    it('should calculate exponential backoff delay', () => {
      const retryOptions = { retries: 1, retryDelay: 1000, maxRetryDelay: 5000 };

      expect(httpClient['calculateRetryDelay'](0, retryOptions)).toBe(1000);
      expect(httpClient['calculateRetryDelay'](1, retryOptions)).toBe(2000);
      expect(httpClient['calculateRetryDelay'](2, retryOptions)).toBe(4000);
    });

    it('should respect max retry delay', () => {
      const retryOptions = { retries: 1, retryDelay: 1000, maxRetryDelay: 3000 };

      expect(httpClient['calculateRetryDelay'](3, retryOptions)).toBe(3000); // Capped at max
      expect(httpClient['calculateRetryDelay'](4, retryOptions)).toBe(3000); // Capped at max
    });
  });

  describe('getErrorCode', () => {
    it('should return correct error codes for status codes', () => {
      const statusCodeMap = {
        400: 'BAD_REQUEST',
        401: 'UNAUTHORIZED',
        403: 'FORBIDDEN',
        404: 'NOT_FOUND',
        409: 'CONFLICT',
        422: 'VALIDATION_ERROR',
        429: 'RATE_LIMIT_EXCEEDED',
        500: 'INTERNAL_SERVER_ERROR',
        502: 'BAD_GATEWAY',
        503: 'SERVICE_UNAVAILABLE',
        504: 'GATEWAY_TIMEOUT',
        999: 'UNKNOWN_ERROR',
      };

      Object.entries(statusCodeMap).forEach(([status, expectedCode]) => {
        const result = httpClient['getErrorCode'](parseInt(status));
        expect(result).toBe(expectedCode);
      });
    });
  });
});
