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

export const addNewCartItem = async (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const userId = req.user.id;
    const { updatedCartItem } = req.body;

    console.log("REQ.BODY: =============> ", req.body);

    console.log("updated cart item: ", updatedCartItem);
    const userIdObj = mongoose.Types.ObjectId(userId);
    const user = await User.findOneAndUpdate(
      { _id: userIdObj },
      {
        $push: {
          cart: {
            item_id: updatedCartItem.item_id,
            qty: updatedCartItem.qty,
            price: updatedCartItem.price,
          },
        },
      }
    );

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
    const { addedItemId, qty, price } = req.body;
    const userId = req.user.id;
    console.log("addedItem: ", addedItemId, qty);
    // return;
    const updateQty = await User.findOneAndUpdate(
      {
        _id: userId,
        "cart.item_id": addedItemId,
      },
      {
        $set: {
          "cart.$": {
            item_id: addedItemId,
            qty: qty + 1,
            price: price,
          },
        },
      }
    );

    const updatedData = await Item.findOne({ _id: addedItemId });
    console.log(updatedData);
    res.send({
      updatedCart: updatedData,
      updatedCartQty: qty + 1,
    });
  } catch (err) {
    console.log(err);
  }
};

export const removeCartItem = async (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const { removedItemId, qty, price } = req.body;
    const userId = req.user.id;
    console.log("addedItem: ", removedItemId, qty);
    // return;
    const updateQty = await User.findOneAndUpdate(
      {
        _id: userId,
        "cart.item_id": removedItemId,
      },
      {
        $set: {
          "cart.$": {
            item_id: removedItemId,
            qty: qty - 1,
            price: price,
          },
        },
      }
    );

    const updatedData = await Item.findOne({ _id: removedItemId });
    console.log(updatedData);
    res.send({
      updatedCart: updatedData,
      updatedCartQty: qty - 1,
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

export const removeEntireCartItem = async (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const { itemId, itemQty, totalItems } = req.body;
    console.log(itemQty, totalItems);
    // return;
    const userId = req.user.id;
    const deleteItem = await User.updateOne(
      { _id: userId },
      { $pull: { cart: { item_id: itemId } } }
    );
    const updateTotalItems = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { total_cart_items: totalItems - itemQty } }
    );
    console.log(updateTotalItems);
    res.send({ updateTotalItems });
  } catch (err) {
    console.log(err);
  }
};

export const getCartLength = async (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const userId = req.user.id;
    const userData = await User.findOne({ _id: userId }, { cart: 1 });
    console.log(userData.cart.length);
    res.send({ cartLength: userData.cart.length });
  } catch (err) {
    console.log(err);
  }
};

export const isCartItemAdded = async (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const userId = req.user.id;
    const { itemId } = req.body;
    const userData = await User.findOne({ _id: userId }, { cart: 1 });
    // console.log(userData.cart);
    let exists = false;
    for (var i in userData.cart) {
      if (userData.cart[i].item_id === itemId) {
        exists = true;
        break;
      }
    }
    res.send({ cartItem: exists });
  } catch (err) {
    console.log(err);
  }
};

export const updateOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const existingCart = await User.findOne({ _id: userId }, { cart: 1 });
    console.log("EC==================>", existingCart.cart);
    const oldCart = existingCart.cart;
    const addOrder = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          orders: {
            order: oldCart,
          },
        },
        cart: [],
      }
    );
    console.log(addOrder);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};
