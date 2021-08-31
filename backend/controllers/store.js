import Shop from "../models/shop";
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
