import { DynamicModule, Module } from '@nestjs/common';
import { PAYSTACK_MODULE_OPTIONS } from './constants';
import { PaystackModuleOptions } from './interfaces';
import { PaystackService } from './paystack.service';

@Module({})
export class PaystackModule {
  static forRoot(options: PaystackModuleOptions): DynamicModule {
    return {
      module: PaystackModule,
      providers: [
        {
          provide: PAYSTACK_MODULE_OPTIONS,
          useValue: {
            baseUrl: 'https://api.paystack.co',
            timeout: 30000,
            retries: 3,
            retryDelay: 1000,
            maxRetryDelay: 10000,
            ...options,
          },
        },
        PaystackService,
      ],
      exports: [PaystackService],
      global: true,
    };
  }

  static forRootAsync(options: any): DynamicModule {
    return {
      module: PaystackModule,
      imports: options.imports || [],
      providers: [
        {
          provide: PAYSTACK_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        PaystackService,
      ],
      exports: [PaystackService],
      global: true,
    };
  }
}
