import { registerAs } from '@nestjs/config';

export interface PaymentConfig {
  merchant_key: string;
  merchant_salt: string;
  easebuzz_domain: string;
}

export default registerAs('paymentConfig', () => ({
  merchant_key: process.env.EASEBUZZ_MERCHANT_KEY,
  merchant_salt: process.env.EASEBUZZ_MERCHANT_SALT,
  easebuzz_domain: process.env.EASEBUZZ_DOMAIN,
}));
