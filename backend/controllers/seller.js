import User from "../models/user";
import AWS from "aws-sdk";

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsConfig);

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

export const addItem = async (req, res) => {
  try {
    console.log("itemCategory: ", req.body.itemCategory.length);
    console.log("imagesBase64: ", req.body.imagesBase64.length);
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};
