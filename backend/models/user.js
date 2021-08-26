import mongoose from "mongoose";
const { Schema } = mongoose;
import {itemSchema} from "./item";

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
    shop_name: {
      type: String,
    },
    items: [itemSchema],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
