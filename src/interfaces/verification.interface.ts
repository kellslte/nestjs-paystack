export interface VerifyAccountNumberRequest {
    account_number: string;
    account_code: string;
}

export interface VerifyAccountNumberResponse {
    status: boolean;
    message: string;
    data: {
        account_number: string;
        account_name: string;
        bank_id: number;
    };
}

export interface VerifyCardBinRequest {
    bin: string;
}

export interface VerifyCardBinResponse {
    status: boolean;
    message: string;
    data: {
        bin: string;
        brand: string;
        sub_brand: string;
        country_code: string;
        country_name: string;
        card_type: string;
        bank: string;
        linked_bank_id: number;
    };
}

export interface VerifyBVNRequest {
    bvn: string;
}

export interface VerifyBVNResponse {
    status: boolean;
    message: string;
    data: {
        bvn: string;
        first_name: string;
        last_name: string;
        date_of_birth: string;
        phone_number: string;
        registration_date: string;
        enrollment_bank: string;
        enrollment_branch: string;
        image: string | null;
    };
}
