import { registerAs } from '@nestjs/config';

export interface PaymentConfig {
  easebuzz_merchant_key: string;
  easebuzz_merchant_salt: string;
  easebuzz_domain: string;
  razorpay_key_id: string;
  razorpay_key_secret: string;
}

export default registerAs('paymentConfig', () => ({
  easebuzz_merchant_key: process.env.EASEBUZZ_MERCHANT_KEY,
  easebuzz_merchant_salt: process.env.EASEBUZZ_MERCHANT_SALT,
  easebuzz_domain: process.env.EASEBUZZ_DOMAIN,
  razorpay_key_id: process.env.RAZORPAY_KEY_ID,
  razorpay_key_secret: process.env.RAZORPAY_KEY_SECRET,
}));
