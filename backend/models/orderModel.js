import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food"
      },
      name: String,
      category: String,
      price: Number,
      quantity: Number,
      total: Number
    }
  ],

  customerInfo: {
    name: String,
    address: String,
    phone: String
  },

  totalQuantity: Number,
  subTotal: Number,
  deliveryFee: Number,
  total: Number,

  status: {
    type: String,
    enum: ["Pending", "Cooking", "Delivered"],
    default: "Pending"
  }

}, { timestamps: true });

export default mongoose.model("Order", orderSchema);