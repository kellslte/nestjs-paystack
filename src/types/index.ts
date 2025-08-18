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
