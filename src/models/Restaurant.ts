import * as mongoose from "mongoose";
import { model } from "mongoose";

const restaurantSchema = new mongoose.Schema({
  user_id: { type: mongoose.Types.ObjectId, required: true },
  city_id: { type: mongoose.Types.ObjectId, required: true },
  name: { type: String, required: true },
  description: { type: String },
  restaurant_image: { type: String },
  open_time: { type: String, required: true },
  close_time: { type: String, required: true },
  address: { type: String, required: true },
  location: { type: Object, required: true },
  cuisines: { type: Array, required: true },
  status: { type: Boolean, required: true, default: true }, // true is active, false is inactive
  created_at: { type: Date, required: true, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() },
});

export default model("restaurant", restaurantSchema);
