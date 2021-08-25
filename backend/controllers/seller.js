import User from "../models/user";
import AWS from "aws-sdk";
import { nanoid } from "nanoid";

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
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
    const { itemCategory, imagesBase64 } = req.body;
    console.log(itemCategory.length);
    console.log(imagesBase64.length);

    // let postPic = imagesBase64[0];
    // console.log(postPic);
    // return;

    imagesBase64.map((item) => {
      let postPic = item.b64Uri;
      console.log(item.url);
      const base64Data = new Buffer.from(
        postPic.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      const type = postPic.split(";")[0].split("/")[1];
      const params = {
        Bucket: "onlinestore2",
        Key: `${nanoid()}.${type}`,
        Body: base64Data,
        ACL: "public-read",
        ContentEncoding: "base64",
        ContentType: `image/${type}`,
      };

      S3.upload(params, async (err, data) => {
        console.log("S3 upload func");
        if (err) {
          console.log("AWS ERROR: ", err);
          return res.sendStatus(400);
        }
        console.log("datadata", data);
        if (data) {
          console.log("data to be sent: ", data);
          res.send({ ok: true });
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};
