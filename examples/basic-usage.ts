import { PaystackModule } from '@scwar/nestjs-paystack';
import { Module } from '@nestjs/common';

// Example 1: Basic Module Configuration
@Module({
  imports: [
    PaystackModule.forRoot({
      secretKey: 'sk_test_your_secret_key_here',
      baseUrl: 'https://api.paystack.co',
      timeout: 30000,
      retries: 3,
      retryDelay: 1000,
      maxRetryDelay: 10000,
    }),
  ],
})
export class BasicPaystackModule {}

// Example 2: Async Module Configuration
@Module({
  imports: [
    PaystackModule.forRootAsync({
      useFactory: () => ({
        secretKey: process.env.PAYSTACK_SECRET_KEY,
        baseUrl: process.env.PAYSTACK_BASE_URL || 'https://api.paystack.co',
        timeout: parseInt(process.env.PAYSTACK_TIMEOUT) || 30000,
        retries: parseInt(process.env.PAYSTACK_RETRIES) || 3,
      }),
    }),
  ],
})
export class AsyncPaystackModule {}

// Example 3: Service Usage
import { PaystackService } from '@scwar/nestjs-paystack';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  constructor(private readonly paystackService: PaystackService) {}

  // Initialize a transaction
  async createPayment(amount: number, email: string) {
    try {
      const response = await this.paystackService.transaction.initialize({
        amount: amount * 100, // Convert to kobo (smallest currency unit)
        email,
        currency: 'NGN',
        callback_url: 'https://your-domain.com/verify-payment',
        metadata: {
          custom_fields: [
            {
              display_name: 'Payment for',
              variable_name: 'payment_for',
              value: 'Product Purchase',
            },
          ],
        },
      });

      return {
        success: true,
        authorizationUrl: response.data.authorization_url,
        reference: response.data.reference,
        accessCode: response.data.access_code,
      };
    } catch (error) {
      console.error('Payment initialization failed:', error);
      throw error;
    }
  }

  // Verify a transaction
  async verifyPayment(reference: string) {
    try {
      const response = await this.paystackService.transaction.verify(reference);
      
      if (response.data.status === 'success') {
        return {
          success: true,
          amount: response.data.amount / 100, // Convert from kobo
          currency: response.data.currency,
          customer: response.data.customer,
          metadata: response.data.metadata,
        };
      } else {
        return {
          success: false,
          status: response.data.status,
          message: response.data.gateway_response,
        };
      }
    } catch (error) {
      console.error('Payment verification failed:', error);
      throw error;
    }
  }

  // Create a customer
  async createCustomer(email: string, firstName: string, lastName: string) {
    try {
      const response = await this.paystackService.customer.create({
        email,
        first_name: firstName,
        last_name: lastName,
        metadata: {
          source: 'website',
        },
      });

      return {
        success: true,
        customerCode: response.data.customer_code,
        customerId: response.data.id,
      };
    } catch (error) {
      console.error('Customer creation failed:', error);
      throw error;
    }
  }

  // Charge a saved authorization
  async chargeSavedCard(amount: number, email: string, authorizationCode: string) {
    try {
      const response = await this.paystackService.transaction.chargeAuthorization({
        amount: amount * 100,
        email,
        authorization_code: authorizationCode,
        reference: `charge_${Date.now()}`,
      });

      return {
        success: true,
        transactionId: response.data.id,
        reference: response.data.reference,
        amount: response.data.amount / 100,
      };
    } catch (error) {
      console.error('Card charge failed:', error);
      throw error;
    }
  }

  // List transactions with pagination
  async getTransactions(page: number = 1, perPage: number = 10) {
    try {
      const response = await this.paystackService.transaction.list({
        page,
        perPage,
        status: 'success',
      });

      return {
        transactions: response.data,
        pagination: response.meta,
      };
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      throw error;
    }
  }

  // Verify bank account
  async verifyBankAccount(accountNumber: string, bankCode: string) {
    try {
      const response = await this.paystackService.verification.verifyAccountNumber({
        account_number: accountNumber,
        account_code: bankCode,
      });

      return {
        success: true,
        accountName: response.data.account_name,
        accountNumber: response.data.account_number,
        bankId: response.data.bank_id,
      };
    } catch (error) {
      console.error('Bank account verification failed:', error);
      throw error;
    }
  }

  // Create a payment page
  async createPaymentPage(name: string, amount: number) {
    try {
      const response = await this.paystackService.page.create({
        name,
        amount,
        description: `Payment page for ${name}`,
        slug: `payment-${Date.now()}`,
        redirect_url: 'https://your-domain.com/payment-success',
        custom_fields: [
          {
            display_name: 'Customer Name',
            variable_name: 'customer_name',
            value: 'Required',
          },
        ],
      });

      return {
        success: true,
        pageId: response.data.id,
        pageUrl: response.data.url,
        slug: response.data.slug,
      };
    } catch (error) {
      console.error('Payment page creation failed:', error);
      throw error;
    }
  }

  // Check account balance
  async checkBalance() {
    try {
      const response = await this.paystackService.balance.check();
      
      return {
        success: true,
        balance: response.data,
      };
    } catch (error) {
      console.error('Balance check failed:', error);
      throw error;
    }
  }

  // List banks
  async getBanks(country: string = 'Nigeria') {
    try {
      const response = await this.paystackService.bank.listBanks({
        country,
        currency: 'NGN',
      });

      return {
        success: true,
        banks: response.data,
      };
    } catch (error) {
      console.error('Failed to fetch banks:', error);
      throw error;
    }
  }
}
