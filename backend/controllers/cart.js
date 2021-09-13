import Shop from "../models/shop";
import User from "../models/user";
import Item from "../models/item";
var mongoose = require("mongoose");

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

export const addToCart = async (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const userId = req.user.id;
    const { itemId } = req.params;
    const { updatedCartItem, totalCartItems, newItem } = req.body;

    console.log("REQ.BODY: =============> ", req.body);

    console.log("updated cart item: ", updatedCartItem);
    const userIdObj = mongoose.Types.ObjectId(userId);

    if (newItem) {
      console.log("TRUEEEEEEEEEE");
      const user = await User.findOneAndUpdate(
        { _id: userIdObj },
        {
          total_cart_items: totalCartItems + 1,
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
          total_cart_items: totalCartItems + 1,
          $set: {
            "cart.$": {
              item_id: updatedCartItem.item_id,
              qty: updatedCartItem.qty + 1,
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

export const getCheckoutCartItems = async (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    let totalCartItems = [];
    const userId = req.user.id;

    const cartItems = await User.find({ _id: userId }, { cart: 1 });
    // console.log(
    //   "totalcartitems ==================>>>>>>>>>>>>>>>>>>>>>>",
    //   cartItems[0].cart
    // );
    console.log(cartItems[0]);
    for (let i in cartItems[0].cart) {
      // console.log(cartItems[0].cart[i]);
      const itemData = await Item.findOne({
        _id: cartItems[0].cart[i].item_id,
      });
      // console.log("itemDATAAAAAAAAAAAAAA: ", itemData);
      totalCartItems.push({
        cartItem: itemData,
        qty: cartItems[0].cart[i].qty,
      });
    }

    res.send({ totalCartItems });
  } catch (err) {
    console.log(err);
  }
};

export const addCartItem = async (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const { addedItemId, qty, totalCartItems } = req.body;
    const userId = req.user.id;
    console.log("addedItem: ", addedItemId, totalCartItems, qty);
    // return;
    const updateQty = await User.findOneAndUpdate(
      {
        _id: userId,
        "cart.item_id": addedItemId,
      },
      {
        total_cart_items: totalCartItems + 1,
        $set: {
          "cart.$": {
            item_id: addedItemId,
            qty: qty + 1,
          },
        },
      }
    );

    const updatedData = await Item.findOne({ _id: addedItemId });
    console.log(updatedData);
    res.send({
      updatedCart: updatedData,
      updatedCartQty: qty + 1,
      newTotalCartItems: totalCartItems + 1,
    });
  } catch (err) {
    console.log(err);
  }
};

export const removeCartItem = async (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const { removedItemId, qty, totalCartItems } = req.body;
    const userId = req.user.id;
    console.log("addedItem: ", removedItemId, totalCartItems, qty);
    // return;
    const updateQty = await User.findOneAndUpdate(
      {
        _id: userId,
        "cart.item_id": removedItemId,
      },
      {
        total_cart_items: totalCartItems - 1,
        $set: {
          "cart.$": {
            item_id: removedItemId,
            qty: qty - 1,
          },
        },
      }
    );

    const updatedData = await Item.findOne({ _id: removedItemId });
    console.log(updatedData);
    res.send({
      updatedCart: updatedData,
      updatedCartQty: qty - 1,
      newTotalCartItems: totalCartItems - 1,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getCartItems = async (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const userId = req.user.id;
    const cartData = await User.findOne(
      { _id: userId },
      { cart: 1, total_cart_items: 1 }
    );
    console.log(cartData);
    res.send({
      cartData: cartData.cart,
      totalCartItems: cartData.total_cart_items,
    });
  } catch (err) {
    console.log(err);
  }
};
