import mongoose from "mongoose";
const { Schema } = mongoose;

export const wishlistSchema = new Schema({
  item_id: {
    type: String,
  },
});

export default mongoose.model("Wishlist", wishlistSchema);
