import { PaystackError } from '../../src/errors/paystack.error';

describe('PaystackError', () => {
    it('should be defined', () => {
        expect(PaystackError).toBeDefined();
    });

    describe('constructor', () => {
        it('should create error with all properties', () => {
            const error = new PaystackError('Test error message', 500, 'TEST_ERROR', { data: 'test' });

            expect(error.message).toBe('Test error message');
            expect(error.status).toBe(500);
            expect(error.code).toBe('TEST_ERROR');
            expect(error.data).toEqual({ data: 'test' });
            expect(error.name).toBe('PaystackError');
            expect(error.stack).toBeDefined();
        });

        it('should create error without data', () => {
            const error = new PaystackError('Test error message', 400, 'BAD_REQUEST');

            expect(error.message).toBe('Test error message');
            expect(error.status).toBe(400);
            expect(error.code).toBe('BAD_REQUEST');
            expect(error.data).toBeUndefined();
            expect(error.name).toBe('PaystackError');
        });

        it('should capture stack trace when available', () => {
            const error = new PaystackError('Test error', 500, 'TEST_ERROR');

            // Mock Error.captureStackTrace
            const originalCaptureStackTrace = Error.captureStackTrace;
            Error.captureStackTrace = jest.fn();

            const errorWithStack = new PaystackError('Test error', 500, 'TEST_ERROR');

            expect(Error.captureStackTrace).toHaveBeenCalledWith(errorWithStack, PaystackError);

            // Restore original
            Error.captureStackTrace = originalCaptureStackTrace;
        });
    });

    describe('fromResponse', () => {
        it('should create error from response object', () => {
            const response = {
                message: 'API error message',
                status: 422,
                code: 'VALIDATION_ERROR',
                data: { field: 'value' },
            };

            const error = PaystackError.fromResponse(response);

            expect(error.message).toBe('API error message');
            expect(error.status).toBe(422);
            expect(error.code).toBe('VALIDATION_ERROR');
            expect(error.data).toEqual(response.data);
        });

        it('should handle response without message', () => {
            const response = {
                status: 500,
                code: 'INTERNAL_SERVER_ERROR',
                data: { error: 'details' },
            };

            const error = PaystackError.fromResponse(response);

            expect(error.message).toBe('Paystack API error');
            expect(error.status).toBe(500);
            expect(error.code).toBe('INTERNAL_SERVER_ERROR');
            expect(error.data).toEqual(response.data);
        });

        it('should handle response without status', () => {
            const response = {
                message: 'Test message',
                code: 'INTERNAL_SERVER_ERROR',
                data: { error: 'details' },
            };

            const error = PaystackError.fromResponse(response);

            expect(error.message).toBe('Test message');
            expect(error.status).toBe(500);
            expect(error.code).toBe('INTERNAL_SERVER_ERROR');
            expect(error.data).toEqual(response.data);
        });

        it('should handle response without code', () => {
            const response = {
                message: 'Test message',
                status: 404,
                data: { error: 'details' },
            };

            const error = PaystackError.fromResponse(response);

            expect(error.message).toBe('Test message');
            expect(error.status).toBe(404);
            expect(error.code).toBe('UNKNOWN_ERROR');
            expect(error.data).toEqual(response.data);
        });
    });

    describe('fromHttpError', () => {
        it('should create error from HTTP error details', () => {
            const error = PaystackError.fromHttpError(401, 'Unauthorized access', { details: 'auth failed' });

            expect(error.message).toBe('Unauthorized access');
            expect(error.status).toBe(401);
            expect(error.code).toBe('UNAUTHORIZED');
            expect(error.data).toEqual({ details: 'auth failed' });
        });

        it('should create error without data', () => {
            const error = PaystackError.fromHttpError(403, 'Forbidden');

            expect(error.message).toBe('Forbidden');
            expect(error.status).toBe(403);
            expect(error.code).toBe('FORBIDDEN');
            expect(error.data).toBeUndefined();
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
            };

            Object.entries(statusCodeMap).forEach(([status, expectedCode]) => {
                const error = PaystackError.fromHttpError(parseInt(status), 'Test error');
                expect(error.code).toBe(expectedCode);
            });
        });

        it('should return UNKNOWN_ERROR for unrecognized status codes', () => {
            const error = PaystackError.fromHttpError(999, 'Unknown error');
            expect(error.code).toBe('UNKNOWN_ERROR');
        });
    });

    describe('toJSON', () => {
        it('should return serializable error object', () => {
            const error = new PaystackError('Test error', 500, 'TEST_ERROR', { data: 'test' });
            const json = error.toJSON();

            expect(json).toEqual({
                name: 'PaystackError',
                message: 'Test error',
                status: 500,
                code: 'TEST_ERROR',
                data: { data: 'test' },
                stack: error.stack,
            });
        });

        it('should handle error without data', () => {
            const error = new PaystackError('Test error', 400, 'BAD_REQUEST');
            const json = error.toJSON();

            expect(json).toEqual({
                name: 'PaystackError',
                message: 'Test error',
                status: 400,
                code: 'BAD_REQUEST',
                data: undefined,
                stack: error.stack,
            });
        });
    });

    describe('inheritance', () => {
        it('should be instance of Error', () => {
            const error = new PaystackError('Test error', 500, 'TEST_ERROR');
            expect(error).toBeInstanceOf(Error);
        });

        it('should be instance of PaystackError', () => {
            const error = new PaystackError('Test error', 500, 'TEST_ERROR');
            expect(error).toBeInstanceOf(PaystackError);
        });
    });
});
