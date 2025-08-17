import { Injectable } from '@nestjs/common';
import { PaystackError } from './errors/paystack.error';
import { HttpRequestOptions, HttpResponse, HttpError, RetryOptions } from './interfaces';

@Injectable()
export class HttpClient {
    async request<T = any>(options: HttpRequestOptions, retryOptions: RetryOptions): Promise<HttpResponse<T>> {
        let lastError: HttpError;

        for (let attempt = 0; attempt <= retryOptions.retries; attempt++) {
            try {
                return await this.makeRequest<T>(options);
            } catch (error) {
                lastError = this.createHttpError(error);

                // Don't retry on the last attempt
                if (attempt === retryOptions.retries) {
                    break;
                }

                // Check if we should retry this error
                if (!this.shouldRetry(lastError, retryOptions)) {
                    break;
                }

                // Wait before retrying
                const delay = this.calculateRetryDelay(attempt, retryOptions);
                await this.sleep(delay);
            }
        }

        throw new PaystackError(
            lastError.message,
            lastError.status,
            'HTTP_REQUEST_FAILED',
            lastError.data
        );
    }

    private async makeRequest<T>(options: HttpRequestOptions): Promise<HttpResponse<T>> {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), options.timeout || 30000);

        try {
            const response = await fetch(options.url, {
                method: options.method,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                body: options.body ? JSON.stringify(options.body) : undefined,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            const responseData = await this.parseResponse<T>(response);

            if (!response.ok) {
                throw new PaystackError(
                    responseData.message || `HTTP ${response.status}`,
                    response.status,
                    this.getErrorCode(response.status),
                    responseData
                );
            }

            return {
                status: response.status,
                statusText: response.statusText,
                headers: this.parseHeaders(response.headers),
                data: responseData,
            };
        } catch (error) {
            clearTimeout(timeoutId);

            if (error instanceof PaystackError) {
                throw error;
            }

            if (error.name === 'AbortError') {
                throw new PaystackError('Request timeout', 408, 'TIMEOUT');
            }

            throw new PaystackError(
                error.message || 'Network error',
                0,
                'NETWORK_ERROR',
                error
            );
        }
    }

    private async parseResponse<T>(response: Response): Promise<T> {
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            try {
                return await response.json();
            } catch {
                return {} as T;
            }
        }

        if (contentType && contentType.includes('text/')) {
            return (await response.text()) as T;
        }

        return {} as T;
    }

    private parseHeaders(headers: Headers): Record<string, string> {
        const result: Record<string, string> = {};
        headers.forEach((value, key) => {
            result[key] = value;
        });
        return result;
    }

    private createHttpError(error: any): HttpError {
        if (error instanceof PaystackError) {
            return {
                status: error.status,
                statusText: error.code,
                message: error.message,
                data: error.data,
            };
        }

        return {
            status: 0,
            statusText: 'UNKNOWN',
            message: error.message || 'Unknown error',
            data: error,
        };
    }

    private shouldRetry(error: HttpError, retryOptions: RetryOptions): boolean {
        // Use custom retry logic if provided
        if (retryOptions.shouldRetry) {
            return retryOptions.shouldRetry(error);
        }

        // Default retry logic
        const isRetryableStatus = [408, 429, 500, 502, 503, 504].includes(error.status);
        const isRetryableMessage = ['timeout', 'network', 'connection', 'server error', 'gateway', 'service unavailable']
            .some(msg => error.message.toLowerCase().includes(msg));

        return isRetryableStatus || isRetryableMessage;
    }

    private calculateRetryDelay(attempt: number, retryOptions: RetryOptions): number {
        const delay = retryOptions.retryDelay * Math.pow(2, attempt);
        return Math.min(delay, retryOptions.maxRetryDelay);
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private getErrorCode(status: number): string {
        switch (status) {
            case 400:
                return 'BAD_REQUEST';
            case 401:
                return 'UNAUTHORIZED';
            case 403:
                return 'FORBIDDEN';
            case 404:
                return 'NOT_FOUND';
            case 409:
                return 'CONFLICT';
            case 422:
                return 'VALIDATION_ERROR';
            case 429:
                return 'RATE_LIMIT_EXCEEDED';
            case 500:
                return 'INTERNAL_SERVER_ERROR';
            case 502:
                return 'BAD_GATEWAY';
            case 503:
                return 'SERVICE_UNAVAILABLE';
            case 504:
                return 'GATEWAY_TIMEOUT';
            default:
                return 'UNKNOWN_ERROR';
        }
    }
}
