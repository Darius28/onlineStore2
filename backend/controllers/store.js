import Shop from "../models/shop";
var mongoose = require("mongoose");

export const selectedItem = async (req, res) => {
  try {
    console.log(req.params.itemId);
    var objectId = mongoose.Types.ObjectId(req.params.itemId);
    const item = await Shop.findOne({ "items._id": objectId });
    console.log(item);
    res.send({ item });
  } catch (err) {
    console.log(err);
  }
};
