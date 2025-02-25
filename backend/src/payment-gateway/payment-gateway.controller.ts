import { Controller, Post, Body, Res } from '@nestjs/common';
import { PaymentGatewayService } from './payment-gateway.service';
import { EasebuzzPaymentGatewayDto } from './dto/create-payment-gateway.dto';
import { Response } from 'express';

@Controller('payment-gateway')
export class PaymentGatewayController {
  constructor(private readonly paymentGatewayService: PaymentGatewayService) {}

  @Post('/initiate-payment-link')
  create(@Body() payload: EasebuzzPaymentGatewayDto): Promise<void> {
    return this.paymentGatewayService.initiatePaymentLink(payload);
  }

  @Post('success')
  async paymentSuccess(@Body() data, @Res() res: Response): Promise<void> {
    return this.paymentGatewayService.paymentSuccess(data, res);
  }

  @Post('failed')
  async paymentFailed(@Body() data, @Res() res: Response): Promise<void> {
    return this.paymentGatewayService.paymentFailed(data, res);
  }
}
