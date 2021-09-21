import mongoose from "mongoose";
const { Schema } = mongoose;

export const cartSchema = new Schema({
  item_id: {
    type: String,
  },
  qty: {
    type: Number,
  },
  price: {
    type: Number,
  },
  name: {
    type: String
  }
});

export default mongoose.model("Cart", cartSchema);
