import express from "express";

import authUser from "../middleware/authUser.js";

import {

  placeOrder,
  userOrders,
  allOrders,
  updateStatus,

  placeOrderStripe,
  verifyStripe,
  placeOrderRazorpay

} from "../controllers/orderController.js";

const orderRouter = express.Router();

// user

orderRouter.post(
  "/place",
  authUser,
  placeOrder
);

orderRouter.post(
  "/stripe",
  authUser,
  placeOrderStripe
);

orderRouter.post(
  "/razorpay",
  authUser,
  placeOrderRazorpay
);


orderRouter.post(
  "/verifyStripe",
  authUser,
  verifyStripe
);



orderRouter.post(
  "/userorders",
  authUser,
  userOrders
);

// admin

orderRouter.post(
  "/list",
  authUser,
  allOrders
);

orderRouter.post(
  "/status",
  authUser,
  updateStatus
);

export default orderRouter;