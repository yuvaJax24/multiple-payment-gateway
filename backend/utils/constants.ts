export enum PAYMENT_MODE {
  NET_BANKING = 'NB',
  DEBIT_CARD = 'DC',
  CREDIT_CARD = 'CC',
  MOBILE_WALLET = 'MW',
  UPI = 'UPI',
  OLA_MONEY = 'OM',
  EMI = 'EMI',
  E_CHALLAN = 'CBT',
  IMPS_NEFT_RTGS = 'BT',
}

export enum PAYMENT_STATUS {
  SUCCESS = 'success',
  CANCELLED = 'userCancelled',
  FAILED = 'failure',
}

export enum PAYMENT_GATEWAY_SERVICE_TYPE {
  EASEBUZZ = 'easebuzz',
  RAZORPAY = 'razorpay',
}
