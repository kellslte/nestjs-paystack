import { Injectable, Inject } from '@nestjs/common';
import { PAYSTACK_MODULE_OPTIONS } from './constants';
import { PaystackModuleOptions } from './interfaces';
import { TransactionService } from './services/transaction.service';
import { CustomerService } from './services/customer.service';
import { BankService } from './services/bank.service';
import { DisputeService } from './services/dispute.service';
import { BalanceService } from './services/balance.service';
import { ChargeService } from './services/charge.service';
import { PageService } from './services/page.service';
import { RefundService } from './services/refund.service';
import { VerificationService } from './services/verification.service';
import { TransferService } from './services/transfer.service';
import { TransferRecipientService } from './services/transfer-recipient.service';
import { SubscriptionService } from './services/subscription.service';
import { SplitService } from './services/split.service';
import { SettlementService } from './services/settlement.service';

@Injectable()
export class PaystackService {
  public readonly transaction: TransactionService;
  public readonly customer: CustomerService;
  public readonly bank: BankService;
  public readonly dispute: DisputeService;
  public readonly balance: BalanceService;
  public readonly charge: ChargeService;
  public readonly page: PageService;
  public readonly refund: RefundService;
  public readonly verification: VerificationService;
  public readonly transfer: TransferService;
  public readonly transferRecipient: TransferRecipientService;
  public readonly subscription: SubscriptionService;
  public readonly split: SplitService;
  public readonly settlement: SettlementService;

  constructor(
    @Inject(PAYSTACK_MODULE_OPTIONS) private readonly options: PaystackModuleOptions,
  ) {
    this.transaction = new TransactionService(this.options);
    this.customer = new CustomerService(this.options);
    this.bank = new BankService(this.options);
    this.dispute = new DisputeService(this.options);
    this.balance = new BalanceService(this.options);
    this.charge = new ChargeService(this.options);
    this.page = new PageService(this.options);
    this.refund = new RefundService(this.options);
    this.verification = new VerificationService(this.options);
    this.transfer = new TransferService(this.options);
    this.transferRecipient = new TransferRecipientService(this.options);
    this.subscription = new SubscriptionService(this.options);
    this.split = new SplitService(this.options);
    this.settlement = new SettlementService(this.options);
  }

  /**
   * Get the current configuration
   */
  getConfig(): PaystackModuleOptions {
    return { ...this.options };
  }

  /**
   * Check if the service is properly configured
   */
  isConfigured(): boolean {
    return !!(this.options.secretKey && this.options.baseUrl);
  }
}
