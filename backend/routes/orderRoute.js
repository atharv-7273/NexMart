import express from "express";
import authUser from "../middleware/authUser.js";
import adminAuth from "../middleware/adminAuth.js";
import {
  placeOrder,
  userOrders,
  allOrders,
  updateStatus,
  placeOrderStripe,
  verifyStripe,
  placeOrderRazorpay,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// User features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);
orderRouter.post("/verifyStripe", authUser, verifyStripe);
orderRouter.post("/userorders", authUser, userOrders);

// Admin features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

export default orderRouter;