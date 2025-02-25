/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import axios from "axios";
import { PAYMENT_GATEWAY_SERVICE_TYPE } from "../../utils/constants";
import { useEffect } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type PaymentDetailType = {
  amount: number;
  currency: string;
  payment_gateway_service_type: PAYMENT_GATEWAY_SERVICE_TYPE;
};

const RazorpayPaymentGateWay = ({
  buttontext = "Pay",
  paymentDetail,
}: {
  buttontext?: string;
  paymentDetail: PaymentDetailType;
}) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const onPay = async () => {
    const payload = { ...paymentDetail };
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/payment-gateway/initiate-payment-link`,
      payload
    );
    const order = await res?.data;
    if (order) {
      const options = {
        key: import.meta.env.RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "My App",
        order_id: order.id,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  };

  return (
    <div>
      <Button type="primary" loading={false} onClick={onPay}>
        {buttontext}
      </Button>
    </div>
  );
};

export default RazorpayPaymentGateWay;
