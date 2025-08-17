# @nestjs/paystack

A comprehensive NestJS module for integrating with the Paystack API. This package provides a complete wrapper around all Paystack API endpoints with robust error handling, retries, and TypeScript support.

## Features

- 🚀 **Complete API Coverage**: All Paystack API endpoints implemented
- 🔄 **Automatic Retries**: Built-in retry mechanism with exponential backoff
- 🛡️ **Robust Error Handling**: Comprehensive error handling with detailed error messages
- 📝 **TypeScript Support**: Full type definitions for all API requests and responses
- 🧪 **Comprehensive Testing**: Extensive test coverage for all endpoints
- ⚡ **Performance**: Uses native fetch API for optimal performance
- 🔧 **Configurable**: Easy configuration through NestJS module options

## Installation

```bash
npm install @nestjs/paystack
```

## Quick Start

### 1. Import the module

```typescript
import { PaystackModule } from '@nestjs/paystack';

@Module({
  imports: [
    PaystackModule.forRoot({
      secretKey: 'your-paystack-secret-key',
      baseUrl: 'https://api.paystack.co',
      timeout: 30000,
      retries: 3,
    }),
  ],
})
export class AppModule {}
```

### 2. Inject and use the service

```typescript
import { PaystackService } from '@nestjs/paystack';

@Injectable()
export class PaymentService {
  constructor(private readonly paystackService: PaystackService) {}

  async createTransaction(amount: number, email: string) {
    return this.paystackService.transaction.initialize({
      amount: amount * 100, // Convert to kobo
      email,
      callback_url: 'https://your-domain.com/verify',
    });
  }
}
```

## Configuration Options

```typescript
interface PaystackModuleOptions {
  secretKey: string;
  baseUrl?: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  maxRetryDelay?: number;
}
```

## Available Services

### Transaction Service
- Initialize transaction
- Verify transaction
- List transactions
- Fetch transaction
- Charge authorization
- Check authorization
- Export transactions
- Request reauthorization
- Send transaction receipt

### Customer Service
- Create customer
- List customers
- Fetch customer
- Update customer
- Validate customer
- Blacklist/whitelist customer

### Plan Service
- Create plan
- List plans
- Fetch plan
- Update plan

### Subscription Service
- Create subscription
- List subscriptions
- Fetch subscription
- Activate subscription
- Cancel subscription

### Page Service
- Create page
- List pages
- Fetch page
- Update page
- Check slug availability

### Split Service
- Create split
- List splits
- Fetch split
- Update split
- Add/subtract split

### Settlement Service
- List settlements
- Fetch settlement

### Transfer Service
- Initiate transfer
- List transfers
- Fetch transfer
- Finalize transfer
- Verify transfer

### Transfer Recipient Service
- Create recipient
- List recipients
- Fetch recipient
- Update recipient
- Delete recipient

### Balance Service
- Check balance
- List ledger

### Bank Service
- List banks
- List bank branches

### Charge Service
- Create charge
- Submit PIN
- Submit OTP
- Submit phone
- Submit birthday
- Check pending charge

### Dispute Service
- List disputes
- Fetch dispute
- Update dispute
- Add evidence
- Upload evidence

### Refund Service
- Create refund
- List refunds
- Fetch refund

### Verification Service
- Verify account number
- Verify card BIN
- Verify BVN

## Error Handling

The package provides comprehensive error handling with detailed error messages:

```typescript
try {
  const result = await this.paystackService.transaction.initialize(data);
} catch (error) {
  if (error instanceof PaystackError) {
    console.log('Paystack Error:', error.message);
    console.log('Error Code:', error.code);
    console.log('HTTP Status:', error.status);
  }
}
```

## Retry Mechanism

Automatic retries with exponential backoff for failed requests:

```typescript
// Configure retries in module options
PaystackModule.forRoot({
  secretKey: 'your-key',
  retries: 3,           // Number of retry attempts
  retryDelay: 1000,     // Initial delay in ms
  maxRetryDelay: 10000, // Maximum delay in ms
})
```

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue on GitHub or contact the maintainers.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.
