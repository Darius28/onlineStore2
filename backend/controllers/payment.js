import Razorpay from "razorpay";
import { nanoid } from "nanoid";
import crypto from "crypto";

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const getOrderId = async (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const { amount, currency } = req.body;
    var options = {
      amount: amount * 100,
      currency,
      receipt: nanoid(),
    };
    instance.orders.create(options, function (err, order) {
      console.log(order);
      res.json(order);
    });
  } catch (err) {
    console.log(err);
  }
};

export const verifySignature = async (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const { paymentId, rzpOrderId, signature, orderId } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET;
    var hash = crypto
      .createHmac("sha256", secret)
      .update(orderId + "|" + paymentId)
      .digest("hex");

    if (hash === signature) {
      return res.json({ ok: true });
    } else {
      return res.json({ ok: false });
    }
  } catch (err) {
    console.log(err);
  }
};
