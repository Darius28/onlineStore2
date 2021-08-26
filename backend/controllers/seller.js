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
    const { shop } = req.body;
    const user = await User.findOneAndUpdate(
      { email: req.body.email },
      { $set: { seller: true, shop_name: shop } }
    ).exec();
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const addItem = async (req, res) => {
  try {
    const { itemCategory, imagesBase64 } = req.body;

    let awsImageObj = [];

    const uploadImages = () => {
      return new Promise((resolve, reject) => {
        imagesBase64.map((item) => {
          let postPic = item.b64Uri;
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
              reject(err);
              return res.sendStatus(400);
            }
            // console.log("data", data);
            if (data) {
              console.log("DATA RETREIVED!!!!!");
              // console.log("data to be sent: ", data);
              awsImageObj.push(data);
              if (awsImageObj.length === imagesBase64.length) {
                resolve();
              }
            }
          });
        });
      });
    };

    uploadImages()
      .then(() => {
        res.send({ awsImageObj });
      })
      .catch((err) => console.log("promise error: ", err));
  } catch (err) {
    console.log(err);
  }
};
