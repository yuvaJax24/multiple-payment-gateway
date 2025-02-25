import { IsNotEmpty } from '@nestjs/class-validator';
import { PAYMENT_GATEWAY_SERVICE_TYPE, PAYMENT_MODE } from 'utils/constants';

export class EasebuzzPaymentGatewayDto {
  @IsNotEmpty()
  payment_gateway_service_type: PAYMENT_GATEWAY_SERVICE_TYPE;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  productinfo: string;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  phone: number;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  surl: string;

  @IsNotEmpty()
  furl: string;

  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
  udf6?: string;
  udf7?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
  show_payment_mode?: PAYMENT_MODE;
  split_payments?: { [key: string]: number };
  request_flow?: string;
  sub_merchant_id?: string;
  payment_category?: string;
  account_no?: string;
  ifsc?: string;
}

export class RazorpayPaymentGatewayDto {
  @IsNotEmpty()
  payment_gateway_service_type: PAYMENT_GATEWAY_SERVICE_TYPE;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  currency: string;
}
