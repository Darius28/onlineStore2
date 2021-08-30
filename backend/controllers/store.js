import Shop from "../models/shop";

export const selectedItem = async (req, res) => {
  try {
    console.log(req.params.itemId);
  } catch (err) {
    console.log(err);
  }
};
