import mongoose from "mongoose";
const { ObjectId } = mongoose;
const { Schema } = mongoose;
import { itemSchema } from "./item";

export const shopSchema = new Schema({
  shop_owner: {
    type: String,
    required: true,
  },
  shop_name: {
    type: String,
    required: true,
  },
  items: [itemSchema],
});

export default mongoose.model("Shop", shopSchema);
