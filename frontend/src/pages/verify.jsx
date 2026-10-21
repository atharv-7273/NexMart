import React, { useContext, useEffect } from "react";

import { ShopContext } from "../context/ShopContext";

import { useSearchParams } from "react-router-dom";

import axios from "axios";

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);

  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");

  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/verifyStripe",

        {
          success,
          orderId,
        },

        {
          headers: { token },
        },
      );

      if (response.data.success) {
        setCartItems({});

        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-2xl font-semibold">Verifying Payment...</p>
    </div>
  );
};

export default Verify;
