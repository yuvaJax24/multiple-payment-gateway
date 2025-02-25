import { Injectable } from '@nestjs/common';
import {
  EasebuzzPaymentGatewayDto,
  RazorpayPaymentGatewayDto,
} from './dto/create-payment-gateway.dto';
import { PaymentGatewayFactory } from './payment-gateway.factory';
import { Response } from 'express';
import { PaymentGatewayRepository } from './repository/payment-gateway-repository';

@Injectable()
export class PaymentGatewayService {
  constructor(
    private readonly paymentGatewayFactory: PaymentGatewayFactory,
    private readonly paymentGatewayRepository: PaymentGatewayRepository,
  ) {}
  async initiatePaymentLink(data: EasebuzzPaymentGatewayDto): Promise<void> {
    const paymentService = await this.paymentGatewayFactory.getPaymentGateway(
      data?.payment_gateway_service_type,
    );
    return await paymentService.initiatePaymentLink(
      data as EasebuzzPaymentGatewayDto & RazorpayPaymentGatewayDto,
    );
  }

  async paymentSuccess(query: any, res: Response): Promise<void> {
    return await this.paymentGatewayRepository.paymentSuccess(query, res);
  }

  async paymentFailed(query: any, res: Response): Promise<void> {
    return await this.paymentGatewayRepository.paymentFailed(query, res);
  }
}
