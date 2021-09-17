import mongoose from "mongoose";
import { cartSchema } from "./cart";
const { ObjectId } = mongoose;
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 6,
      max: 64,
      required: true,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
    },
    seller: {
      type: Boolean,
      default: false,
    },
    shop_id: {
      type: ObjectId,
    },
    cart: {
      type: [cartSchema],
      default: [],
    },
    orders: [],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
