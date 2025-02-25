import EasebuzzPaymentGateWay from "../components/paymentGateway/EasebuzzWrapper";

const PaymentGateway = () => {
  return (
    <div>
      <p>Payment</p>
      <EasebuzzPaymentGateWay
        paymentDetail={{
          amount: 500.0,
          productinfo: "iPhone 15",
          firstname: "Yuva",
          phone: 8667688764,
          email: "yuvaprasatha34@gmail.com",
          surl: `${import.meta.env.VITE_API_URL}/payment-gateway/success`,
          furl: `${import.meta.env.VITE_API_URL}/payment-gateway/failed`,
        }}
      />
    </div>
  );
};

export default PaymentGateway;
