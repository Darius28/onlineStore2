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
