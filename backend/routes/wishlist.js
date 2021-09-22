import express from "express";
const router = express.Router();
import { validJwt } from "../middleware";
import {
  addItemToWishlist,
  removeItemFromWishlist,
  getOrdersData,
  getWishlistData,
} from "../controllers/wishlist";

router.post("/add-item-to-wishlist", validJwt, addItemToWishlist);
router.post("/remove-item-from-wishlist", validJwt, removeItemFromWishlist);
router.get("/get-orders-data", validJwt, getOrdersData);
router.get("/get-wishlist-data", validJwt, getWishlistData);

module.exports = router;
