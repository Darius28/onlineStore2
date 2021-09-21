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
      res.json({ ok: true });
    } catch (err) {
      console.log(err);
    }
  };
