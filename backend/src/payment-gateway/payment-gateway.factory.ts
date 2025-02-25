/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { __PaymentGatewayEntity } from './entities/payment-gateway.entity';
import { CreatePaymentGatewayDto } from './dto/create-payment-gateway.dto';
import { PaymentGatewayEaseBuzzRepository } from './repository/payment-gateway-easebuzz.repository';
import { PAYMENT_GATEWAY_SERVICE_TYPE } from 'utils/constants';
import { Response } from 'express';

@Injectable()
export class PaymentGatewayFactory {
  private gateways: __PaymentGatewayEntity[];
  constructor(
    private readonly paymentGatewayEaseBuzzRepository: PaymentGatewayEaseBuzzRepository,
  ) {
    this.gateways = [this.paymentGatewayEaseBuzzRepository];
  }

  async getAvailableGateway() {
    const serviceType: PAYMENT_GATEWAY_SERVICE_TYPE =
      PAYMENT_GATEWAY_SERVICE_TYPE.EASEBUZZ;
    switch (serviceType) {
      case PAYMENT_GATEWAY_SERVICE_TYPE.EASEBUZZ:
        return this.paymentGatewayEaseBuzzRepository;

      default:
        return this.paymentGatewayEaseBuzzRepository;
    }
  }

  async initializePayment(payload: CreatePaymentGatewayDto) {
    const gateway = await this.getAvailableGateway();
    return await gateway.initiatePaymentLink(payload);
  }

  async paymentSuccess(query: any, res: Response) {
    const gateway = await this.getAvailableGateway();
    return await gateway.paymentSuccess(query, res);
  }
  async paymentFailed(query: any, res: Response) {
    const gateway = await this.getAvailableGateway();
    return await gateway.paymentFailed(query, res);
  }
}
