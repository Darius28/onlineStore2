import Item from "../models/item";
import User from "../models/user";

export const addItemToWishlist = async (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const { itemId } = req.body;
    const userId = req.user.id;
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          wishlist: { item_id: itemId },
        },
      }
    );
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const removeItemFromWishlist = async (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const { itemId } = req.body;
    const userId = req.user.id;
    const user = await User.updateOne(
      { _id: userId },
      {
        $pull: {
          wishlist: { item_id: itemId },
        },
      }
    );
    res.send({ user });
  } catch (err) {
    console.log(err);
  }
};

export const getOrdersData = async (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const userId = req.user.id;
    const orders = await User.findOne({ _id: userId }, { orders: 1 });
    const ordersArray = orders.orders;

    var totalOrdersArray = [];
    for (var i in ordersArray) {
      console.log("OA i: ", ordersArray[i]);
      var itemsArray = [];
      for (var j in ordersArray[i].order) {
        console.log("OA j: ", ordersArray[i].order[j]);
        const item = await Item.findOne({
          _id: ordersArray[i].order[j].item_id,
        });
        itemsArray.push({
          item,
          price: ordersArray[i].order[j].price,
          qty: ordersArray[i].order[j].qty,
        });
      }
      totalOrdersArray.push({ itemsArray, orderDate: ordersArray[i].date });
    }
    res.send(totalOrdersArray);
  } catch (err) {
    console.log(err);
  }
};

export const getWishlistData = async (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const userId = req.user.id;
    const wishlist = await User.findOne({ _id: userId }, { wishlist: 1 });
    console.log(wishlist.wishlist);
    const wlArr = wishlist.wishlist;
    var wishlistData = [];
    for (var i in wlArr) {
      const itemData = await Item.findOne({ _id: wlArr[i].item_id });
      wishlistData.push(itemData);
    }
    res.send({ wishlist: wishlistData });
  } catch (err) {
    console.log(err);
  }
};
