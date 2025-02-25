import { PartialType } from '@nestjs/mapped-types';
import { EasebuzzPaymentGatewayDto } from './create-payment-gateway.dto';

export class UpdatePaymentGatewayDto extends PartialType(
  EasebuzzPaymentGatewayDto,
) {}
