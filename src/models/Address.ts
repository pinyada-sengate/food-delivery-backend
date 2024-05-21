import * as mongoose from "mongoose";
import { model } from "mongoose";

const addressSchema = new mongoose.Schema({
  user_id: { type: mongoose.Types.ObjectId, required: true },
  title: { type: String, required: true },
  address: { type: String, required: true },
  house: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  status: { type: Boolean, required: true, default: true }, // true is active, false is inactive
  created_at: { type: Date, required: true, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() },
});

export default model("addresses", addressSchema);
