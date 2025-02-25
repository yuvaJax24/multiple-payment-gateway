/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentConfig } from 'config/payment.config';
import { RazorpayPaymentGatewayDto } from '../dto/create-payment-gateway.dto';

const Razorpay = require('razorpay');

@Injectable()
export class PaymentGatewayRazorpayRepository {
  private razorpay: any;

  constructor(private readonly configService: ConfigService) {
    this.razorpay = new Razorpay({
      key_id:
        configService.get<PaymentConfig>('paymentConfig')!.razorpay_key_id,
      key_secret:
        configService.get<PaymentConfig>('paymentConfig')!.razorpay_key_secret,
    });
  }

  async initiatePaymentLink(data: RazorpayPaymentGatewayDto): Promise<void> {
    const options = {
      amount: data?.amount * 100,
      currency: data?.currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1, // Auto-capture payment
    };
    try {
      const res = await this.razorpay.orders.create(options);
      console.log('first1', res);
      return res;
    } catch {
      throw new Error(`Error creating Razorpay order`);
    }
  }
}
