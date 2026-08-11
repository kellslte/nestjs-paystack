import type { PaystackWebhookEvent, PaystackWebhookEventName } from '../types';

export type PaystackWebhookPayload = string | Buffer;

export interface PaystackWebhookVerificationOptions {
  /**
   * The raw request payload sent by Paystack.
   */
  payload: PaystackWebhookPayload;

  /**
   * Value of the x-paystack-signature header.
   */
  signature?: string | string[];
}

export interface PaystackWebhookResult<T = unknown> extends PaystackWebhookEvent<T> {
  event: PaystackWebhookEventName | string;
}