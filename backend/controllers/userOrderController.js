import Order from "../models/orderModel.js";

// GET logged-in user's orders only
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId })
      .populate("items.foodId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders
    });

  } catch (error) {
    console.log("Get my orders error:", error);
    res.json({
      success: false,
      message: "Cannot fetch your orders"
    });
  }
};