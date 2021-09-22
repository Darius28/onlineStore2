import Shop from "../models/shop";
import User from "../models/user";
import Item from "../models/item";
var mongoose = require("mongoose");

export const selectedItem = async (req, res) => {
  try {
    var inWishlist = false;
    if (req.user) {
      const userId = req.user.id;
      const user = await User.findOne({ _id: userId }, { wishlist: 1 });

      console.log("selected item user: ", user);
      for (var i in user.wishlist) {
        if (user.wishlist[i].item_id === req.params.itemId) {
          inWishlist = true;
          break;
        }
      }
      // console.log("item in wishlist status: ", inWishlist);
    }

    var objectId = mongoose.Types.ObjectId(req.params.itemId);
    const item = await Item.findOne({ _id: objectId });
    console.log(item);
    res.send({ item, inWishlist });
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

export const editStoreName = async (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    console.log("req.sent");
    const { newStoreName } = req.body;
    const shopOwnerId = req.user.id;
    const editShopName = await Shop.findOneAndUpdate(
      { shop_owner: shopOwnerId },
      { shop_name: newStoreName }
    );
    const editShopNameUser = await User.findOneAndUpdate(
      { _id: shopOwnerId },
      { shop_name: newStoreName }
    );
    const itemIdArray = editShopName.items;
    for (var i in itemIdArray) {
      const editItems = await Item.findOneAndUpdate(
        { _id: itemIdArray[i] },
        { shop_name: newStoreName }
      );
    }
    res.send({ ok: true });
  } catch (err) {
    console.log(err);
  }
};
