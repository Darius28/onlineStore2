import Shop from "../models/shop";
import User from "../models/user";
import Item from "../models/item";
var mongoose = require("mongoose");

export const selectedItem = async (req, res) => {
  try {
    console.log(req.params.itemId);
    var objectId = mongoose.Types.ObjectId(req.params.itemId);
    const item = await Item.findOne({ _id: objectId });
    console.log(item);
    res.send({ item });
  } catch (err) {
    console.log(err);
  }
};

export const reviewItem = async (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const { review, rating } = req.body;
    const userId = req.user.id;
    const { itemId } = req.params;

    const itemObjectId = mongoose.Types.ObjectId(itemId);
    const userObjectId = mongoose.Types.ObjectId(userId);

    const addReview = await Item.updateOne(
      { _id: itemObjectId },
      {
        $push: {
          reviews: {
            reviewer_id: userObjectId,
            rating: rating,
            description: review,
          },
        },
      }
    );
    res.json({ ok: true });
    console.log(addReview);
  } catch (err) {
    console.log(err);
  }
};

export const getStoreItems = async (req, res) => {
  try {
    const allItems = await Item.find({});
    res.send({ items: allItems });
  } catch (err) {
    console.log(err);
  }
};

export const addToCart = async (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const userId = req.user.id;
    const { itemId } = req.params;
    const { updatedCartItem, newItem, totalItems } = req.body;

    console.log("REQ.BODY: =============> ", req.body);

    console.log("updated cart item: ", updatedCartItem, totalItems);
    const userIdObj = mongoose.Types.ObjectId(userId);

    if (newItem) {
      console.log("TRUEEEEEEEEEE");
      const user = await User.findOneAndUpdate(
        { _id: userIdObj },
        {
          total_cart_items: totalItems + 1,
          $push: {
            cart: {
              item_id: updatedCartItem.item_id,
              qty: updatedCartItem.qty,
            },
          },
        }
      );
    } else {
      console.log("FLASEEEEEEEEEEEE");
      const user = await User.findOneAndUpdate(
        { _id: userIdObj, "cart.item_id": updatedCartItem.item_id },
        {
          total_cart_items: totalItems + 1,
          $set: {
            "cart.$": {
              item_id: updatedCartItem.item_id,
              qty: updatedCartItem.qty,
            },
          },
        }
      );
    }
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};
