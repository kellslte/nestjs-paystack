export class PaystackWebhookSignatureError extends Error {
  public readonly code = 'INVALID_WEBHOOK_SIGNATURE';

  constructor() {
    super('Invalid Paystack webhook signature');

    this.name = 'PaystackWebhookSignatureError';

    Object.setPrototypeOf(this, PaystackWebhookSignatureError.prototype);
  }
}
