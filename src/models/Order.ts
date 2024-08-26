import * as mongoose from "mongoose";
import { model } from "mongoose";

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Types.ObjectId, required: true },
  restaurant_id: { type: mongoose.Types.ObjectId, required: true },
  order: { type: String, required: true },
  address: { type: Object, require: true },
  total: { type: Number, require: true },
  delivery_fee: { type: Number, require: true },
  payment_status: { type: Boolean, require: true },
  payment_mode: { type: String, require: true },
  created_at: { type: Date, required: true, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() },
});

export default model("orders", orderSchema);
