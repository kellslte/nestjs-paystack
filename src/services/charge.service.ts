import { BaseService } from '../base.service';
import { PaystackModuleOptions } from '../interfaces';
import {
  CheckPendingChargeResponse,
  CreateChargeRequest,
  CreateChargeResponse,
  SubmitOtpRequest,
  SubmitOtpResponse,
  SubmitPhoneRequest,
  SubmitPhoneResponse,
  SubmitPinRequest,
  SubmitPinResponse,
  SubmitBirthdayRequest,
  SubmitBirthdayResponse,
} from '../interfaces/charge.interface';

export class ChargeService extends BaseService {
  constructor(options: PaystackModuleOptions) {
    super(options);
  }

  async create(data: CreateChargeRequest): Promise<CreateChargeResponse | any> {
    return this.post<CreateChargeResponse>('/charge', data);
  }

  async submitPin(data: SubmitPinRequest): Promise<SubmitPinResponse | any> {
    return this.post<SubmitPinResponse>('/charge/submit_pin', data);
  }

  async submitOtp(data: SubmitOtpRequest): Promise<SubmitOtpResponse | any> {
    return this.post<SubmitOtpResponse>('/charge/submit_otp', data);
  }

  async submitPhone(data: SubmitPhoneRequest): Promise<SubmitPhoneResponse | any> {
    return this.post<SubmitPhoneResponse>('/charge/submit_phone', data);
  }

  async submitBirthday(data: SubmitBirthdayRequest): Promise<SubmitBirthdayResponse | any> {
    return this.post<SubmitBirthdayResponse>('/charge/submit_birthday', data);
  }

  async checkPending(reference: string): Promise<CheckPendingChargeResponse | any> {
    return this.get<CheckPendingChargeResponse>(`/charge/${reference}`);
  }
}
