import { createHmac, timingSafeEqual } from 'node:crypto';

import type { PaystackModuleOptions } from '../interfaces/module.interface';
import type {
  PaystackWebhookPayload,
  PaystackWebhookVerificationOptions,
} from '../interfaces/webhook.interface';
import { PaystackWebhookEvent } from '../types';
import { PaystackWebhookSignatureError } from '../errors/paystack-webhook-signature.error';

export class WebhookService {
  constructor(private readonly options: PaystackModuleOptions) {}

  /**
   * Generates the HMAC SHA512 signature for a webhook payload.
   *
   * This is useful for testing and should generally not be needed
   * by consumers of the package in production.
   */
  generateSignature(payload: PaystackWebhookPayload): string {
    return createHmac('sha512', this.options.secretKey).update(payload).digest('hex');
  }

  /**
   * Verifies that a webhook payload was signed using the
   * configured Paystack secret key.
   *
   * Returns false when the signature is missing or invalid.
   */
  verifySignature(payload: PaystackWebhookPayload, signature?: string | string[]): boolean {
    if (!signature || Array.isArray(signature)) {
      return false;
    }

    if (!signature.trim()) {
      return false;
    }

    const expectedSignature = this.generateSignature(payload);

    const expectedBuffer = Buffer.from(expectedSignature, 'hex');

    const receivedBuffer = Buffer.from(signature, 'hex');

    /**
     * timingSafeEqual throws when the buffers have
     * different lengths, so check first.
     */
    if (expectedBuffer.length !== receivedBuffer.length) {
      return false;
    }

    return timingSafeEqual(expectedBuffer, receivedBuffer);
  }

  /**
   * Verifies the webhook signature and parses the
   * raw payload into a Paystack webhook event.
   *
   * Throws PaystackWebhookSignatureError when
   * verification fails.
   */
  verifyAndParse<T = unknown>(
    options: PaystackWebhookVerificationOptions,
  ): PaystackWebhookEvent<T> {
    const isValid = this.verifySignature(options.payload, options.signature);

    if (!isValid) {
      throw new PaystackWebhookSignatureError();
    }

    return this.parse<T>(options.payload);
  }

  /**
   * Parses a webhook payload.
   *
   * This method does NOT verify the signature.
   *
   * Use verifyAndParse() when processing an actual
   * Paystack webhook request.
   */
  parse<T = unknown>(payload: PaystackWebhookPayload): PaystackWebhookEvent<T> {
    const payloadString = Buffer.isBuffer(payload) ? payload.toString('utf8') : payload;

    let event: unknown;

    try {
      event = JSON.parse(payloadString);
    } catch {
      throw new Error('Unable to parse Paystack webhook payload');
    }

    if (
      !event ||
      typeof event !== 'object' ||
      typeof (event as Record<string, unknown>).event !== 'string'
    ) {
      throw new Error('Invalid Paystack webhook payload');
    }

    return event as PaystackWebhookEvent<T>;
  }
}
