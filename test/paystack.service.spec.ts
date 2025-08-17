import { Test, TestingModule } from '@nestjs/testing';
import { PaystackService } from '../src/paystack.service';
import { PaystackModule } from '../src/paystack.module';

describe('PaystackService', () => {
  let service: PaystackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PaystackModule.forRoot({
          secretKey: 'test-secret-key',
          baseUrl: 'https://api.paystack.co',
        }),
      ],
    }).compile();

    service = module.get<PaystackService>(PaystackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have all service modules', () => {
    expect(service.transaction).toBeDefined();
    expect(service.customer).toBeDefined();
    expect(service.plan).toBeDefined();
    expect(service.subscription).toBeDefined();
    expect(service.page).toBeDefined();
    expect(service.split).toBeDefined();
    expect(service.settlement).toBeDefined();
    expect(service.transfer).toBeDefined();
    expect(service.transferRecipient).toBeDefined();
    expect(service.balance).toBeDefined();
    expect(service.bank).toBeDefined();
    expect(service.charge).toBeDefined();
    expect(service.dispute).toBeDefined();
    expect(service.refund).toBeDefined();
    expect(service.verification).toBeDefined();
  });

  it('should return configuration', () => {
    const config = service.getConfig();
    expect(config.secretKey).toBe('test-secret-key');
    expect(config.baseUrl).toBe('https://api.paystack.co');
  });

  it('should be properly configured', () => {
    expect(service.isConfigured()).toBe(true);
  });
});
