import { Module } from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service';
import { PaymentGatewayController } from './payment-gateway.controller';
import { PaymentGatewayFactory } from './payment-gateway.factory';
import { PaymentGatewayEaseBuzzRepository } from './repository/payment-gateway-easebuzz.repository';

@Module({
  controllers: [PaymentGatewayController],
  providers: [
    PaymentGatewayService,
    PaymentGatewayFactory,
    PaymentGatewayEaseBuzzRepository,
  ],
})
export class PaymentGatewayModule {}
