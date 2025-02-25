import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  PaymentCancelled,
  PaymentFailed,
  PaymentSuccess,
} from "../components/PaymentGatewayResponse";
import PaymentGateway from "../pages";

export const mainRoutes = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "/", element: <Navigate to="/payment-gateway" /> },
      { path: "/payment-gateway/success", element: <PaymentSuccess /> },
      { path: "/payment-gateway/failed", element: <PaymentFailed /> },
      { path: "/payment-gateway/cancelled", element: <PaymentCancelled /> },
      { path: "/payment-gateway", element: <PaymentGateway /> },
    ],
  },
]);
