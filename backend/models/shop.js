import mongoose from "mongoose";
const { ObjectId } = mongoose;
const { Schema } = mongoose;
import { itemSchema } from "./item";

export const shopSchema = new Schema({
  shop_owner: {
    type: ObjectId,
    required: true,
  },
  shop_name: {
    type: String,
    required: true,
  },
  items: {
    type: [ObjectId],
  },
});

export default mongoose.model("Shop", shopSchema);
