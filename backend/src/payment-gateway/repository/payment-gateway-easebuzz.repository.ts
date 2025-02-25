/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';
import axios from 'axios';
import { PaymentConfig } from 'config/payment.config';
import { EasebuzzPaymentGatewayDto } from '../dto/create-payment-gateway.dto';

@Injectable()
export class PaymentGatewayEaseBuzzRepository {
  private MERCHANT_KEY: string;
  private MERCHANT_SALT: string;
  private EASEBUZZ_DOMAIN: string;

  constructor(private readonly configService: ConfigService) {
    this.MERCHANT_KEY =
      configService.get<PaymentConfig>('paymentConfig')!.easebuzz_merchant_key;
    this.MERCHANT_SALT =
      configService.get<PaymentConfig>('paymentConfig')!.easebuzz_merchant_salt;
    this.EASEBUZZ_DOMAIN =
      configService.get<PaymentConfig>('paymentConfig')!.easebuzz_domain;
  }

  async initiatePaymentLink(data: EasebuzzPaymentGatewayDto): Promise<void> {
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
}
