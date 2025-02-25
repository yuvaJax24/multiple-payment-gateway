import { Select } from "antd";
import EasebuzzPaymentGateWay from "../components/paymentGateway/EasebuzzWrapper";
import { PAYMENT_GATEWAY_SERVICE_TYPE } from "../utils/constants";
import { useState } from "react";
import RazorpayPaymentGateWay from "../components/paymentGateway/RazorpayWapper";

const PaymentGateway = () => {
  const [selectedPaymentGateway, setSelectedPaymentGateway] =
    useState<PAYMENT_GATEWAY_SERVICE_TYPE>(
      PAYMENT_GATEWAY_SERVICE_TYPE.EASEBUZZ
    );
  const renderPaymentGateway = (
    selectedPaymentGateway: PAYMENT_GATEWAY_SERVICE_TYPE
  ) => {
    switch (selectedPaymentGateway) {
      case PAYMENT_GATEWAY_SERVICE_TYPE.EASEBUZZ:
        return (
          <EasebuzzPaymentGateWay
            paymentDetail={{
              amount: 500.0,
              productinfo: "iPhone 15",
              firstname: "Yuva",
              phone: 8667688764,
              email: "yuvaprasatha34@gmail.com",
              surl: `${import.meta.env.VITE_API_URL}/payment-gateway/success`,
              furl: `${import.meta.env.VITE_API_URL}/payment-gateway/failed`,
              payment_gateway_service_type: selectedPaymentGateway,
            }}
          />
        );
      case PAYMENT_GATEWAY_SERVICE_TYPE.RAZORPAY:
        return (
          <RazorpayPaymentGateWay
            paymentDetail={{
              amount: 600,
              currency: "INR",
              payment_gateway_service_type: selectedPaymentGateway,
            }}
          />
        );
      default:
        return <p>Invalid Payment Gateway</p>;
    }
  };

  return (
    <div>
      <p>Payment Service</p>
      <Select
        value={selectedPaymentGateway}
        onChange={(value) => setSelectedPaymentGateway(value)}
        options={[
          { label: "Ease Buzz", value: PAYMENT_GATEWAY_SERVICE_TYPE.EASEBUZZ },
          { label: "Razor Pay", value: PAYMENT_GATEWAY_SERVICE_TYPE.RAZORPAY },
        ]}
      />
      <p>Payment</p>
      {renderPaymentGateway(selectedPaymentGateway)}
    </div>
  );
};

export default PaymentGateway;
