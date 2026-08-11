import { WebhookService } from '../../src/services/webhook.service';
import { PaystackWebhookSignatureError } from '../../src/errors/paystack-webhook-signature.error';

describe('WebhookService', () => {
  let service: WebhookService;
  const options = {
    secretKey: 'test-secret-key',
    baseUrl: 'https://api.paystack.co',
  };

  const payload = JSON.stringify({
    event: 'charge.success',
    data: { id: 123, reference: 'test-ref' },
  });

  beforeEach(() => {
    service = new WebhookService(options);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateSignature', () => {
    it('should generate the expected HMAC SHA512 signature', () => {
      const signature = service.generateSignature(payload);

      expect(typeof signature).toBe('string');
      expect(signature).toHaveLength(128);
      expect(signature).toBe(service.generateSignature(payload));
    });
  });

  describe('verifySignature', () => {
    it('should return false when signature is missing', () => {
      expect(service.verifySignature(payload, undefined)).toBe(false);
    });

    it('should return false when signature is an array', () => {
      expect(service.verifySignature(payload, ['invalid-signature'])).toBe(false);
    });

    it('should return false when signature is blank', () => {
      expect(service.verifySignature(payload, '   ')).toBe(false);
    });

    it('should return false for an invalid signature', () => {
      expect(service.verifySignature(payload, 'invalidsignature')).toBe(false);
    });

    it('should return true for a valid string payload and signature', () => {
      const validSignature = service.generateSignature(payload);

      expect(service.verifySignature(payload, validSignature)).toBe(true);
    });

    it('should return true for a valid Buffer payload and signature', () => {
      const payloadBuffer = Buffer.from(payload, 'utf8');
      const validSignature = service.generateSignature(payloadBuffer);

      expect(service.verifySignature(payloadBuffer, validSignature)).toBe(true);
    });
  });

  describe('verifyAndParse', () => {
    it('should throw PaystackWebhookSignatureError when signature verification fails', () => {
      expect(() =>
        service.verifyAndParse({
          payload,
          signature: 'invalid-signature',
        }),
      ).toThrow(PaystackWebhookSignatureError);
    });

    it('should verify and parse a valid webhook payload', () => {
      const validSignature = service.generateSignature(payload);
      const result = service.verifyAndParse({
        payload,
        signature: validSignature,
      });

      expect(result).toEqual({
        event: 'charge.success',
        data: { id: 123, reference: 'test-ref' },
      });
    });
  });

  describe('parse', () => {
    it('should parse a valid JSON payload string', () => {
      const result = service.parse(payload);

      expect(result).toEqual({
        event: 'charge.success',
        data: { id: 123, reference: 'test-ref' },
      });
    });

    it('should parse a valid JSON payload buffer', () => {
      const payloadBuffer = Buffer.from(payload, 'utf8');
      const result = service.parse(payloadBuffer);

      expect(result).toEqual({
        event: 'charge.success',
        data: { id: 123, reference: 'test-ref' },
      });
    });

    it('should throw an error for invalid JSON', () => {
      expect(() => service.parse('not-json')).toThrow(
        'Unable to parse Paystack webhook payload',
      );
    });

    it('should throw an error for a JSON payload without an event field', () => {
      expect(() => service.parse(JSON.stringify({ foo: 'bar' }))).toThrow(
        'Invalid Paystack webhook payload',
      );
    });
  });
});
