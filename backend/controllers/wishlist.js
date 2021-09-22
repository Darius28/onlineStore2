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
    res.send({ orders });
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
