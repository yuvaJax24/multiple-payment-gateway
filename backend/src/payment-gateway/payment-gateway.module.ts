import { Module } from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service';
import { PaymentGatewayController } from './payment-gateway.controller';
import { PaymentGatewayFactory } from './payment-gateway.factory';
import { PaymentGatewayEaseBuzzRepository } from './repository/payment-gateway-easebuzz.repository';
import { PaymentGatewayRazorpayRepository } from './repository/payment-gateway-razorpay.repository';
import { PaymentGatewayRepository } from './repository/payment-gateway-repository';

@Module({
  controllers: [PaymentGatewayController],
  providers: [
    PaymentGatewayService,
    PaymentGatewayFactory,
    PaymentGatewayEaseBuzzRepository,
    PaymentGatewayRazorpayRepository,
    PaymentGatewayRepository,
  ],
})
export class PaymentGatewayModule {}
