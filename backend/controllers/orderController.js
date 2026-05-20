import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
  try {
    const {
      customerInfo,
      items,
      totalQuantity,
      subTotal,
      deliveryFee,
      total
    } = req.body;
    if (!customerInfo?.name || !customerInfo?.address || !customerInfo?.phone) {
      return res.status(400).json({
        success: false,
        message: "Please fill customer information"
      });
    }

    // check phone number
    const phoneRegex = /^[0-9]{8,15}$/;

    if (!phoneRegex.test(customerInfo.phone)) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be 8 to 15 digits"
      });
    }

    // today start: 00:00
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // today end: 23:59
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // count today orders of this user
    const todayOrderCount = await Order.countDocuments({
      userId: req.user.id,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay
      }
    });

    if (todayOrderCount >= 10) {
      return res.status(400).json({
        success: false,
        message: "You can only create 10 orders per day"
      });
    }

    const order = new Order({
      userId: req.user.id,
      customerInfo,
      items,
      totalQuantity,
      subTotal,
      deliveryFee,
      total,
      status: "Pending"
    });

    await order.save();

    res.json({
      success: true,
      message: "Order created successfully",
      data: order
    });

  } catch (error) {
    console.log("Create order error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating order"
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders
    });

  } catch (error) {
    console.log("Get all orders error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching orders"
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders
    });

  } catch (error) {
    console.log("Get my orders error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching your orders"
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      data: updatedOrder
    });

  } catch (error) {
    console.log("Update status error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update status"
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    await Order.findByIdAndDelete(orderId);

    res.json({
      success: true,
      message: "Order deleted"
    });

  } catch (error) {
    console.log("Delete order error:", error);
    res.status(500).json({
      success: false,
      message: "Delete failed"
    });
  }
};