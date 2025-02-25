import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PaymentGatewayModule } from './payment-gateway/payment-gateway.module';
import { ConfigModule } from '@nestjs/config';
import paymentConfig from 'config/payment.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [paymentConfig],
    }),
    PaymentGatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
