export interface PaystackModuleOptions {
    /**
     * Your Paystack secret key
     */
    secretKey: string;

    /**
     * Paystack API base URL
     * @default 'https://api.paystack.co'
     */
    baseUrl?: string;

    /**
     * Request timeout in milliseconds
     * @default 30000
     */
    timeout?: number;

    /**
     * Number of retry attempts for failed requests
     * @default 3
     */
    retries?: number;

    /**
     * Initial delay between retries in milliseconds
     * @default 1000
     */
    retryDelay?: number;

    /**
     * Maximum delay between retries in milliseconds
     * @default 10000
     */
    maxRetryDelay?: number;
}

export interface PaystackModuleAsyncOptions {
    /**
     * Import existing providers
     */
    imports?: any[];

    /**
     * Provider that returns PaystackModuleOptions
     */
    useFactory?: (...args: any[]) => Promise<PaystackModuleOptions> | PaystackModuleOptions;

    /**
     * Dependencies to inject into the factory
     */
    inject?: any[];
}
