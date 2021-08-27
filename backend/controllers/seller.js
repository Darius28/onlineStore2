import User from "../models/user";
import Item from "../models/item";
import Shop from "../models/shop";
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
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const { shop } = req.body;
    const userId = req.user.id;
    const shopName = await new Shop({
      shop_owner: userId,
      shop_name: shop,
    }).save();
    const shopId = shopName._id;
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { seller: true, shop_id: shopId } }
    ).exec();
    console.log(user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const addItem = async (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");

  try {
    const userId = req.user.id;
    console.log(userId);
    const { name, price, description, itemCategory, imagesBase64 } = req.body;

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
            if (data) {
              console.log("DATA RETREIVED!!!!!");
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
      .then(async () => {
        const newItem = await Shop.findOneAndUpdate(
          { shop_owner: userId },
          {
            $push: {
              items: {
                name: name,
                price: price,
                category: itemCategory,
                description: description,
                pictures: awsImageObj,
              },
            },
          }
        );
        res.json({ ok: true });
      })
      .catch((err) => console.log("promise error: ", err));
  } catch (err) {
    console.log(err);
  }
};

export const getSellerItems = async (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");

  try {
    const userId = req.user.id;
    console.log("userID from getseller: ", userId);

    const itemsData = await Shop.findOne({ shop_owner: userId });
    console.log(itemsData);
    res.send({ items: itemsData });
  } catch (err) {
    console.log(err);
  }
};
