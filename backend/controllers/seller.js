import User from "../models/user";

export const becomeSeller = async (req, res) => {
  try {
    console.log(req.body.email);
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { $set: { seller: true } }
    ).exec();
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};
