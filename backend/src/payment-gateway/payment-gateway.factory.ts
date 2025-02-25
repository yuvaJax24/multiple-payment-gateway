import { Injectable } from '@nestjs/common';
import { PaymentGatewayEaseBuzzRepository } from './repository/payment-gateway-easebuzz.repository';
import { PAYMENT_GATEWAY_SERVICE_TYPE } from 'utils/constants';
import { PaymentGatewayRazorpayRepository } from './repository/payment-gateway-razorpay.repository';

@Injectable()
export class PaymentGatewayFactory {
  constructor(
    private readonly paymentGatewayEaseBuzzRepository: PaymentGatewayEaseBuzzRepository,
    private readonly paymentGatewayRazorpayRepository: PaymentGatewayRazorpayRepository,
  ) {}

  async getPaymentGateway(gateway: string) {
    switch (gateway.toLowerCase() as PAYMENT_GATEWAY_SERVICE_TYPE) {
      case PAYMENT_GATEWAY_SERVICE_TYPE.EASEBUZZ:
        return this.paymentGatewayEaseBuzzRepository;

      case PAYMENT_GATEWAY_SERVICE_TYPE.RAZORPAY:
        return this.paymentGatewayRazorpayRepository;

      default:
        throw new Error('Unsupported payment gateway');
    }
  }
}
