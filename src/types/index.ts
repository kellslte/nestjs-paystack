// Common types used across the package
export type PaystackCurrency =
  | 'NGN'
  | 'GHS'
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'ZAR'
  | 'KES'
  | 'UGX'
  | 'TZS'
  | 'ZMW'
  | 'XOF'
  | 'XAF'
  | 'EGP'
  | 'MAD'
  | 'BIF'
  | 'CDF'
  | 'DJF'
  | 'DZD'
  | 'ETB'
  | 'GMD'
  | 'KMF'
  | 'LRD'
  | 'LYD'
  | 'MGA'
  | 'MRU'
  | 'RWF'
  | 'SDG'
  | 'SLL'
  | 'SOS'
  | 'STN'
  | 'TND';

export type PaystackChannel =
  | 'card'
  | 'bank'
  | 'ussd'
  | 'qr'
  | 'mobile_money'
  | 'bank_transfer'
  | 'apple_pay'
  | 'google_pay'
  | 'payattitude'
  | 'paga'
  | '1voucher'
  | 'gt_bank'
  | 'himalaya'
  | 'kongapay'
  | 'pocketapp'
  | 'payu'
  | 'standard_chartered'
  | 'sterling_bank'
  | 'teasy'
  | 'vfd'
  | 'vella'
  | 'xpresspay'
  | 'zenith_bank'
  | 'zenith_mobile'
  | 'zenith_ussd'
  | 'zenith_web'
  | 'zenith_atm'
  | 'zenith_pos'
  | 'zenith_qr'
  | 'zenith_bank_transfer'
  | 'zenith_mobile_money'
  | 'zenith_apple_pay'
  | 'zenith_google_pay'
  | 'zenith_payattitude'
  | 'zenith_paga'
  | 'zenith_1voucher'
  | 'zenith_gt_bank'
  | 'zenith_himalaya'
  | 'zenith_kongapay'
  | 'zenith_pocketapp'
  | 'zenith_payu'
  | 'zenith_standard_chartered'
  | 'zenith_sterling_bank'
  | 'zenith_teasy'
  | 'zenith_vfd'
  | 'zenith_vella'
  | 'zenith_xpresspay';

export type PaystackStatus =
  | 'pending'
  | 'success'
  | 'failed'
  | 'abandoned'
  | 'reversed'
  | 'refunded'
  | 'disputed'
  | 'cancelled';

export type PaystackInterval =
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'quarterly'
  | 'biannually'
  | 'annually';

export type PaystackRiskAction = 'allow' | 'deny';

export type PaystackBearer = 'account' | 'subaccount';

export type PaystackSplitType = 'flat' | 'percentage';

export type PaystackTransferSource = 'balance';

export type PaystackRecipientType = 'nuban' | 'mobile_money' | 'gh_pesewa' | 'mpesa' | 'gh_money';

export type PaystackDisputeResolution = 'merchant-accepted' | 'declined';

// Generic response wrapper
export interface PaystackResponse<T = any> {
  status: boolean;
  message: string;
  data: T;
}

// Pagination metadata
export interface PaystackPaginationMeta {
  total: number;
  total_volume?: number;
  total_volume_by_currency?: Record<string, number>;
  page: number;
  perPage: number;
  pageCount: number;
  next_cursor?: string;
  previous_cursor?: string;
}

// Paginated response
export interface PaystackPaginatedResponse<T = any> extends PaystackResponse<T[]> {
  meta: PaystackPaginationMeta;
}

// Webhook Types
/**
 * Paystack webhook event names.
 *
 * This union intentionally contains the events currently documented
 * by Paystack. The generic PaystackWebhookEvent interface still allows
 * consumers to handle future/unknown events.
 */
export type PaystackWebhookEventName =
  | 'charge.dispute.create'
  | 'charge.dispute.remind'
  | 'charge.dispute.resolve'
  | 'charge.success'
  | 'customeridentification.failed'
  | 'customeridentification.success'
  | 'dedicatedaccount.assign.failed'
  | 'dedicatedaccount.assign.success'
  | 'invoice.create'
  | 'invoice.payment_failed'
  | 'invoice.update'
  | 'paymentrequest.pending'
  | 'paymentrequest.success'
  | 'refund.failed'
  | 'refund.pending'
  | 'refund.processed'
  | 'refund.processing'
  | 'subscription.create'
  | 'subscription.disable'
  | 'subscription.expiring_cards'
  | 'subscription.not_renew'
  | 'transfer.failed'
  | 'transfer.success'
  | 'transfer.reversed';

/**
 * Generic Paystack webhook envelope.
 *
 * T is the shape of the event's data property.
 */
export interface PaystackWebhookEvent<T = unknown> {
  event: string;
  data: T;
}

/**
 * Generic webhook event with a known Paystack event name.
 */
export interface TypedPaystackWebhookEvent<T = unknown> extends PaystackWebhookEvent<T> {
  event: PaystackWebhookEventName;
}

/**
 * Data commonly returned by charge.success.
 *
 * Paystack can add fields to this object over time, so this interface
 * intentionally does not attempt to model every nested property.
 */
export interface PaystackChargeSuccessData {
  id: number;
  domain: string;
  status: string;
  reference: string;
  amount: number;
  message: string | null;
  gateway_response: string;
  paid_at: string;
  created_at: string;
  channel: string;
  currency: string;
  ip_address?: string | null;
  metadata?: Record<string, unknown> | null;

  [key: string]: unknown;
}

export type PaystackChargeSuccessEvent = TypedPaystackWebhookEvent<PaystackChargeSuccessData>;

/**
 * Generic transaction webhook data.
 *
 * This is useful for consumers who don't want to depend on the
 * more specific charge.success type.
 */
export interface PaystackTransactionWebhookData {
  id?: number;
  domain?: string;
  status?: string;
  reference?: string;
  amount?: number;
  currency?: string;
  paid_at?: string | null;
  created_at?: string;
  channel?: string;
  metadata?: Record<string, unknown> | null;

  [key: string]: unknown;
}
