# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).## [1.0.3] - 2025-08-19

### Bug Fixes
- update main and types paths in package.json to reflect new directory structure


## [1.0.3] - 2025-08-19

### Bug Fixes
- update main and types paths in package.json to reflect new directory structure


## [1.0.2] - 2025-08-18

### Chores
- update package name to @scwar/nestjs-paystack
- update package name to scoped format
- revert package name to non-scoped format
- update package name to scoped format
- rename package and add troubleshooting guide for GitHub Actions permissions


## [1.0.1] - 2025-08-18

### Chores
- update TypeScript configuration and ESLint rules for improved testing and code quality
- update CI workflow to log release status instead of commenting on PR
- enhance pre-commit hook and add release scripts
- add version bumping system and CI/CD workflows


## [1.0.0] - 2024-01-01

### Added
- Initial release of @scwar/nestjs-paystack package
- Complete Paystack API coverage with all endpoints
- Transaction service with full CRUD operations
- Customer service for customer management
- Plan and subscription services
- Payment page service
- Split payment service
- Settlement service
- Transfer and transfer recipient services
- Balance and bank services
- Charge service for direct charges
- Dispute management service
- Refund service
- Verification service for bank accounts, cards, and BVN
- Robust error handling with custom PaystackError class
- Automatic retry mechanism with exponential backoff
- HTTP client using native fetch API
- Comprehensive TypeScript support
- Full test coverage with Jest
- ESLint and Prettier configuration
- Comprehensive documentation and examples

### Features
- Module configuration with both sync and async options
- Automatic retry for failed requests
- Configurable timeout and retry settings
- Comprehensive error handling
- Type-safe API calls
- Built-in pagination support
- Metadata support for all entities
- Currency and country support
- Multiple payment channel support

### Technical Details
- Built with NestJS framework
- Uses native fetch API for HTTP requests
- Implements retry mechanism with exponential backoff
- Full TypeScript support with comprehensive interfaces
- Modular service architecture
- Easy to extend and customize
- Production-ready with proper error handling
