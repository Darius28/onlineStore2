import mongoose from "mongoose";
const { Schema } = mongoose;

const itemSchema = new Schema(
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
    picture: {},
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);