import { Response } from 'express';
import { EasebuzzPaymentGatewayDto } from '../dto/create-payment-gateway.dto';

export interface __PaymentGatewayEntity {
  initiatePaymentLink(payload: EasebuzzPaymentGatewayDto): Promise<any>;
  paymentSuccess(query: any, res: Response): Promise<any>;
  paymentFailed(query: any, res: Response): Promise<any>;
}
