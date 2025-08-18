export interface CreateChargeRequest {
  email: string;
  amount: number;
  authorization_code?: string;
  pin?: string;
  reference?: string;
  birthday?: string;
  metadata?: Record<string, any>;
  card?: {
    number: string;
    cvv: string;
    expiry_month: string;
    expiry_year: string;
  };
  bank?: {
    code: string;
    account_number: string;
  };
  ussd?: {
    type: string;
  };
  mobile_money?: {
    phone: string;
    provider: string;
  };
}

export interface CreateChargeResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    amount: number;
    currency: string;
    transaction_date: string;
    status: string;
    reference: string;
    metadata: Record<string, any> | null;
    gateway_response: string;
    message: string | null;
    channel: string;
    ip_address: string | null;
    log: Record<string, any> | null;
    fees: number;
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
      account_name: string | null;
    } | null;
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
      customer_code: string;
      phone: string | null;
      metadata: Record<string, any> | null;
      risk_action: string;
      international_format_phone: string | null;
    };
    plan: Record<string, any> | null;
    split: Record<string, any> | null;
    order_id: number | null;
    paidAt: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface SubmitPinRequest {
  pin: string;
  reference: string;
}

export interface SubmitPinResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    amount: number;
    currency: string;
    transaction_date: string;
    status: string;
    reference: string;
    metadata: Record<string, any> | null;
    gateway_response: string;
    message: string | null;
    channel: string;
    ip_address: string | null;
    log: Record<string, any> | null;
    fees: number;
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
      account_name: string | null;
    } | null;
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
      customer_code: string;
      phone: string | null;
      metadata: Record<string, any> | null;
      risk_action: string;
      international_format_phone: string | null;
    };
    plan: Record<string, any> | null;
    split: Record<string, any> | null;
    order_id: number | null;
    paidAt: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface SubmitOtpRequest {
  otp: string;
  reference: string;
}

export interface SubmitOtpResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    amount: number;
    currency: string;
    transaction_date: string;
    status: string;
    reference: string;
    metadata: Record<string, any> | null;
    gateway_response: string;
    message: string | null;
    channel: string;
    ip_address: string | null;
    log: Record<string, any> | null;
    fees: number;
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
      account_name: string | null;
    } | null;
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
      customer_code: string;
      phone: string | null;
      metadata: Record<string, any> | null;
      risk_action: string;
      international_format_phone: string | null;
    };
    plan: Record<string, any> | null;
    split: Record<string, any> | null;
    order_id: number | null;
    paidAt: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface SubmitPhoneRequest {
  phone: string;
  reference: string;
}

export interface SubmitPhoneResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    amount: number;
    currency: string;
    transaction_date: string;
    status: string;
    reference: string;
    metadata: Record<string, any> | null;
    gateway_response: string;
    message: string | null;
    channel: string;
    ip_address: string | null;
    log: Record<string, any> | null;
    fees: number;
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
      account_name: string | null;
    } | null;
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
      customer_code: string;
      phone: string | null;
      metadata: Record<string, any> | null;
      risk_action: string;
      international_format_phone: string | null;
    };
    plan: Record<string, any> | null;
    split: Record<string, any> | null;
    order_id: number | null;
    paidAt: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface SubmitBirthdayRequest {
  birthday: string;
  reference: string;
}

export interface SubmitBirthdayResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    amount: number;
    currency: string;
    transaction_date: string;
    status: string;
    reference: string;
    metadata: Record<string, any> | null;
    gateway_response: string;
    message: string | null;
    channel: string;
    ip_address: string | null;
    log: Record<string, any> | null;
    fees: number;
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
      account_name: string | null;
    } | null;
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
      customer_code: string;
      phone: string | null;
      metadata: Record<string, any> | null;
      risk_action: string;
      international_format_phone: string | null;
    };
    plan: Record<string, any> | null;
    split: Record<string, any> | null;
    order_id: number | null;
    paidAt: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface CheckPendingChargeRequest {
  reference: string;
}

export interface CheckPendingChargeResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    amount: number;
    currency: string;
    transaction_date: string;
    status: string;
    reference: string;
    metadata: Record<string, any> | null;
    gateway_response: string;
    message: string | null;
    channel: string;
    ip_address: string | null;
    log: Record<string, any> | null;
    fees: number;
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
      account_name: string | null;
    } | null;
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
      customer_code: string;
      phone: string | null;
      metadata: Record<string, any> | null;
      risk_action: string;
      international_format_phone: string | null;
    };
    plan: Record<string, any> | null;
    split: Record<string, any> | null;
    order_id: number | null;
    paidAt: string | null;
    createdAt: string;
    updatedAt: string;
  };
}
