import mongoose from "mongoose";
const { Schema } = mongoose;

export const itemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
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
    pictures: [],
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
