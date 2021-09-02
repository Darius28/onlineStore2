import mongoose from "mongoose";
const { ObjectId } = mongoose;
const { Schema } = mongoose;

export const cartSchema = new Schema({
  item_id: {
    type: ObjectId,
  },
  qty: {
    type: String,
  },
});

export default mongoose.model("Cart", cartSchema);
