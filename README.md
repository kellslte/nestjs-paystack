# @scwar/nestjs-paystack

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
npm install @scwar/nestjs-paystack
```

## Quick Start

### 1. Import the module

```typescript
import { PaystackModule } from '@scwar/nestjs-paystack';

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
import { PaystackService } from '@scwar/nestjs-paystack';

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

## Version Management & Releases

This package includes an automated version bumping system that follows semantic versioning and conventional commits.

### Automatic Version Bumping

The system automatically determines the appropriate version bump based on your commits:

```bash
# Automatically determine and bump version
npm run version:auto

# Manual version bumps
npm run version:patch  # 1.0.0 → 1.0.1
npm run version:minor  # 1.0.0 → 1.1.0
npm run version:major  # 1.0.0 → 2.0.0
```

### Conventional Commits

All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
# Feature commits (minor version bump)
git commit -m "feat: add new payment method"

# Bug fix commits (patch version bump)
git commit -m "fix: resolve authentication issue"

# Breaking change commits (major version bump)
git commit -m "feat!: breaking change in API"

# Documentation commits (no version bump)
git commit -m "docs: update README with examples"

# Test commits (no version bump)
git commit -m "test: add unit tests for payment service"
```

### Release Process

#### Automated Release (Recommended)
```bash
# Complete release process with automatic version bump
npm run release:auto

# Manual release with specific version bump
npm run release:patch
npm run release:minor
npm run release:major
```

#### Manual Release Steps
```bash
# 1. Bump version and update changelog
npm run version:auto

# 2. Build and test
npm run build && npm test

# 3. Commit changes
git add .
git commit -m "chore: bump version to $(node -p \"require('./package.json').version\")"

# 4. Create tag
git tag "v$(node -p \"require('./package.json').version\")"

# 5. Push changes and tag
git push && git push --tags

# 6. Publish to npm
npm publish
```

### Changelog Management

The changelog is automatically updated with each version bump:

```bash
# Update changelog with recent changes
npm run changelog:update

# Generate full changelog from git history
npm run changelog:generate -- --full
```

### GitHub Actions

The package includes GitHub Actions workflows for:
- **CI**: Automated testing, linting, and quality checks
- **Release**: Automated version bumping, changelog updates, and npm publishing
- **Security**: Dependency audits and vulnerability checks

### Git Hooks

Pre-commit hooks ensure code quality:
- Linting and formatting checks
- Test execution
- Conventional commit message validation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commit format
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Important**: All commits must follow the conventional commit format to ensure proper version bumping.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue on GitHub or contact the maintainers.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes and version history.
