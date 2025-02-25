import { ReactNode, useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { FaExclamation } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const PaymentResponseWrapper = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  const [time, setTime] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev: number) => {
        if (prev === 0) {
          clearInterval(timer);
          return 0;
        } else return prev - 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [time]);

  return (
    <div
      className={`text-center mt-12 bg-white shadow-sm p-16 rounded flex flex-col items-center ${className}`}
    >
      {children}
      <div className="text-gray-400 mt-2 flex items-end gap-[2px]">
        Redirecting to home page in {time} seconds{" "}
        <div className="h-[2px] w-[2px] bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s] mb-[5px]" />
        <div className="h-[2px] w-[2px] bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s] mb-[5px]" />
        <div className="h-[2px] w-[2px] bg-gray-400 rounded-full animate-bounce mb-[5px]" />
      </div>
    </div>
  );
};

export const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to home after 5 seconds
    const timer = setTimeout(() => navigate("/"), 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <PaymentResponseWrapper>
      <div className="flex items-center justify-center p-4 bg-green-400 shadow-xl rounded-full">
        <AiOutlineCheck size={62} fill="white" />
      </div>
      <h1 className="text-green-400 lg:text-2xl font-semibold mt-3">
        Payment Successful!
      </h1>
      <p>Thank you for your purchase!</p>
    </PaymentResponseWrapper>
  );
};

export const PaymentFailed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to home after 5 seconds
    const timer = setTimeout(() => navigate("/"), 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <PaymentResponseWrapper>
      <div className="flex items-center justify-center p-4 bg-red-400 shadow-xl rounded-full">
        <FaExclamation size={62} fill="white" />
      </div>
      <h1 className="text-red-400 lg:text-2xl font-semibold mt-3">
        Payment Failed!{" "}
      </h1>
    </PaymentResponseWrapper>
  );
};

export const PaymentCancelled = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to home after 5 seconds
    const timer = setTimeout(() => navigate("/"), 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <PaymentResponseWrapper>
      <div className="flex items-center justify-center p-4 bg-yellow-400 shadow-xl rounded-full">
        <AiOutlineClose size={62} fill="white" />
      </div>
      <h1 className="text-yellow-400 lg:text-2xl font-semibold mt-3">
        Payment Cancelled
      </h1>
      <p>
        You have cancelled the payment. If this was a mistake, please try again.
      </p>
    </PaymentResponseWrapper>
  );
};
