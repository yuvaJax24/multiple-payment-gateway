/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';
import axios from 'axios';
import { PaymentConfig } from 'config/payment.config';
import { CreatePaymentGatewayDto } from '../dto/create-payment-gateway.dto';
import { Response } from 'express';
import { PAYMENT_STATUS } from 'utils/constants';

@Injectable()
export class PaymentGatewayEaseBuzzRepository {
  private MERCHANT_KEY: string;
  private MERCHANT_SALT: string;
  private EASEBUZZ_DOMAIN: string;
  private FRONT_END_BASE_URL: string;

  constructor(private readonly configService: ConfigService) {
    this.MERCHANT_KEY =
      configService.get<PaymentConfig>('paymentConfig')!.merchant_key;
    this.MERCHANT_SALT =
      configService.get<PaymentConfig>('paymentConfig')!.merchant_salt;
    this.EASEBUZZ_DOMAIN =
      configService.get<PaymentConfig>('paymentConfig')!.easebuzz_domain;
    this.FRONT_END_BASE_URL = configService.get<string>('FRONT_END_URL') || '';
  }

  async initiatePaymentLink(data: CreatePaymentGatewayDto) {
    const merchant_key = this.MERCHANT_KEY;
    const salt = this.MERCHANT_SALT;
    const currentMonth = new Date().getMonth() + 1;
    const currentFullYear = new Date().getFullYear();
    // TXN{#year}{#month}{#date}{#time} - TXN20252201739996538319
    const txnid = `TXN${currentFullYear}${currentMonth}${new Date().getDate()}${new Date().getTime()}`;
    const payload = {
      ...data,
      key: merchant_key,
      txnid,
      hash: createHash('sha512')
        .update(
          `${merchant_key}|${txnid}|${data?.amount}|${data?.productinfo}|${data?.firstname}|${data?.email}|||||||||||${salt}`,
        )
        .digest('hex'),
    };
    const urlObj = {
      key: payload?.key,
      txnid: payload?.txnid,
      amount: payload?.amount?.toString(),
      productinfo: payload?.productinfo,
      firstname: payload?.firstname,
      email: payload?.email,
      phone: payload?.phone?.toString(),
      surl: payload?.surl,
      furl: payload?.furl,
      hash: payload?.hash,
    };
    const res = await axios.post(
      `${this.EASEBUZZ_DOMAIN}/payment/initiateLink`,
      payload,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
    const paymentUrl = `${this.EASEBUZZ_DOMAIN}/payment/initiateLink?${new URLSearchParams(urlObj)}`;
    return { ...res?.data, paymentUrl };
  }

  async paymentSuccess(query, res: Response) {
    console.log('PAYMENT_SUCCESS::', query);
    return res.redirect(`${this.FRONT_END_BASE_URL}/payment-gateway/success`);
    // return { status: 'Payment Success', data: query };
  }
  async paymentFailed(query, res: Response) {
    console.log('PAYMENT_FAILED::', query);
    const payment_status = query?.status;
    const redirect_url =
      payment_status === PAYMENT_STATUS.CANCELLED
        ? `${this.FRONT_END_BASE_URL}/payment-gateway/cancelled`
        : `${this.FRONT_END_BASE_URL}/payment-gateway/failed`;

    return res.redirect(redirect_url);
  }

  async checkHealth() {
    return true;
  }
}
