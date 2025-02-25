import { Response } from 'express';
import { CreatePaymentGatewayDto } from '../dto/create-payment-gateway.dto';

export interface __PaymentGatewayEntity {
  initiatePaymentLink(payload: CreatePaymentGatewayDto): Promise<any>;
  checkHealth(payload: CreatePaymentGatewayDto): Promise<boolean>;
  paymentSuccess(query: any, res: Response): Promise<any>;
  paymentFailed(query: any, res: Response): Promise<any>;
}
