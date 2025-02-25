/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { PAYMENT_STATUS } from 'utils/constants';

@Injectable()
export class PaymentGatewayRepository {
  private FRONT_END_BASE_URL: string;

  constructor(private readonly configService: ConfigService) {
    this.FRONT_END_BASE_URL = configService.get<string>('FRONT_END_URL') || '';
  }

  async paymentSuccess(query: any, res: Response): Promise<void> {
    console.log('PAYMENT_SUCCESS::', query);
    return res.redirect(`${this.FRONT_END_BASE_URL}/payment-gateway/success`);
  }

  async paymentFailed(query: any, res: Response): Promise<void> {
    console.log('PAYMENT_FAILED::', query);
    const payment_status = query?.status;
    const redirect_url =
      payment_status === PAYMENT_STATUS.CANCELLED
        ? `${this.FRONT_END_BASE_URL}/payment-gateway/cancelled`
        : `${this.FRONT_END_BASE_URL}/payment-gateway/failed`;

    return res.redirect(redirect_url);
  }
}
