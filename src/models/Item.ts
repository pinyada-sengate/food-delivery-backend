import * as mongoose from "mongoose";
import { model } from "mongoose";

// dish in a menu
const itemSchema = new mongoose.Schema({
  restaurant_id: { type: mongoose.Types.ObjectId, required: true },
  category_id: { type: mongoose.Types.ObjectId, required: true },
  name: { type: String, required: true },
  description: { type: String },
  item_image: { type: String },
  price: { type: Number, required: true },
  status: { type: Boolean, required: true, default: true }, // true is active, false is inactive
  vegan: { type: Boolean, required: true, default: true }, // true is vegan dish, false is no vegan
  created_at: { type: Date, required: true, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() },
});

export default model("items", itemSchema);
