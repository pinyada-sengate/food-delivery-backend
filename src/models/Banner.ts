import * as mongoose from "mongoose";
import { model } from "mongoose";

const bannerSchema = new mongoose.Schema({
  banner: { type: String, required: true },
  status: { type: Boolean, required: true, default: true }, // true is active, false is inactive
  created_at: { type: Date, required: true, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() },
});

export default model("banners", bannerSchema);
