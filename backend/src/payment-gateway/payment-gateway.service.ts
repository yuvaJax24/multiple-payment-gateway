/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { CreatePaymentGatewayDto } from './dto/create-payment-gateway.dto';
import { PaymentGatewayFactory } from './payment-gateway.factory';

@Injectable()
export class PaymentGatewayService {
  constructor(private readonly paymentGatewayFactory: PaymentGatewayFactory) {}
  async initiatePaymentLink(data: CreatePaymentGatewayDto) {
    return await this.paymentGatewayFactory.initializePayment(data);
  }
  async paymentSuccess(query, res) {
    return this.paymentGatewayFactory.paymentSuccess(query, res);
  }

  async paymentFailed(query, res) {
    return this.paymentGatewayFactory.paymentFailed(query, res);
  }
}
