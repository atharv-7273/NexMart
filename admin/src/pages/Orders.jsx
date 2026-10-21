import React, { useEffect, useState } from "react";

import axios from "axios";

import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const backendUrl = "http://localhost:4000";

  const currency = "$";

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",

        {},

        {
          headers: { token },
        },
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",

        {
          orderId,
          status: event.target.value,
        },

        {
          headers: { token },
        },
      );

      if (response.data.success) {
        await fetchAllOrders();

        toast.success("Status Updated");
      }
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-5">Order Page</h3>

      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-5 items-start border p-5 md:p-8 my-3 text-sm text-gray-700"
          >
            {/* Product Image */}

            <div>
              {order.items[0]?.image && (
                <img
                  className="w-20 h-20 object-cover rounded"
                  src={order.items[0].image[0]}
                  alt=""
                />
              )}
            </div>

            {/* Product Details */}

            <div>
              {order.items.map((item, idx) => (
                <div key={idx} className="mb-3">
                  <p className="font-medium text-base">
                    {item.name} x {item.quantity}
                    <span className="ml-2">{item.size}</span>
                  </p>
                </div>
              ))}

              {/* Customer Address */}

              <div className="mt-4">
                <p className="font-semibold">
                  {order.address.firstName} {order.address.lastName}
                </p>

                <p>{order.address.street}</p>

                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}
                </p>

                <p>{order.address.zipcode}</p>

                <p>{order.address.phone}</p>
              </div>
            </div>

            {/* Order Info */}

            <div>
              <p>Items : {order.items.length}</p>

              <p className="mt-3">Method : {order.paymentMethod}</p>

              <p>Payment : {order.payment ? "Done" : "Pending"}</p>

              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Amount */}

            <p className="text-lg font-semibold">
              {currency}
              {order.amount}
            </p>

            {/* Status */}

            <select
              value={order.status}
              onChange={(e) => statusHandler(e, order._id)}
              className="p-2 font-semibold border rounded"
            >
              <option>Order Placed</option>

              <option>Packing</option>

              <option>Shipped</option>

              <option>Out for delivery</option>

              <option>Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
