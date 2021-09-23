import mongoose from "mongoose";
const { ObjectId } = mongoose;
const { Schema } = mongoose;

export const reviewSchema = new Schema(
  {
    reviewer_id: {
      type: ObjectId,
      required: true,
    },
    reviewer_name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
