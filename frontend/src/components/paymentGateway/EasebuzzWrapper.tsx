import { Button } from "antd";
import axios from "axios";

type PaymentDetailType = {
  amount: number;
  productinfo: string;
  firstname: string;
  phone: number;
  email: string;
  surl: string;
  furl: string;
};

const EasebuzzPaymentGateWay = ({
  buttontext = "Pay",
  paymentDetail,
}: {
  buttontext?: string;
  paymentDetail: PaymentDetailType;
}) => {
  const onPay = async () => {
    const payload = { ...paymentDetail };
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/payment-gateway/initiate-payment-link`,
      payload
    );
    console.log("first1", res?.data?.data);
    if (res?.data?.data) {
      window.location.href = `${import.meta.env.VITE_API_EASEBUZZ_DOMAIN}/pay/${
        res?.data?.data
      }`;
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

export default EasebuzzPaymentGateWay;
