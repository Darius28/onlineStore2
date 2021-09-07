import mongoose from "mongoose";
const { ObjectId } = mongoose;
const { Schema } = mongoose;

export const cartSchema = new Schema({
  item_id: {
    type: String,
  },
  qty: {
    type: Number,
  },
});

export default mongoose.model("Cart", cartSchema);
