import express from "express";
const router = express.Router();
import { validJwt } from "../middleware";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../controllers/wishlist";

router.post("/add-item-to-wishlist", validJwt, addItemToWishlist);
router.post("/remove-item-from-wishlist", validJwt, removeItemFromWishlist);

module.exports = router;
