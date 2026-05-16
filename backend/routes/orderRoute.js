import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
  deleteOrder
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/create", authMiddleware, createOrder);
orderRouter.get("/list", getAllOrders);
orderRouter.get("/myorders", authMiddleware, getMyOrders);
orderRouter.post("/status", updateOrderStatus);
orderRouter.post("/delete", deleteOrder);

export default orderRouter;