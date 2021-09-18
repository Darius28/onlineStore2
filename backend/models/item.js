import mongoose from "mongoose";
const { ObjectId } = mongoose;
const { Schema } = mongoose;
import { reviewSchema } from "./review";

export const itemSchema = new Schema({
  shop_owner_id: {
    type: ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    required: true,
  },
  category: {
    type: [String],
    enum: [
      "sports",
      "electronics",
      "kitchen",
      "entertainment",
      "health",
      "fitness",
    ],
  },
  description: {
    type: String,
  },
  pictures: [],
  reviews: [reviewSchema],
  shop_name: {
    type: String,
  },
});

export default mongoose.model("Item", itemSchema);
