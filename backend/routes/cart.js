import express from "express";
const router = express.Router();
import { validJwt } from "../middleware";
import {
  reviewItem,
  addToCart,
  getCheckoutCartItems,
  addCartItem,
  removeCartItem,
  getCartItems,
  removeEntireCartItem,
  getCartLength,
} from "../controllers/cart";

router.post("/item/:itemId/review-item", validJwt, reviewItem);
router.post("/:itemId/add-to-cart", validJwt, addToCart);
router.post("/get-checkout-cart-items", validJwt, getCheckoutCartItems);
router.post("/add-cart-item", validJwt, addCartItem);
router.post("/remove-cart-item", validJwt, removeCartItem);
router.get("/get-cart-items", validJwt, getCartItems);
router.post("/remove-entire-cart-item", validJwt, removeEntireCartItem);
router.get("/get-cart-length", validJwt, getCartLength);

module.exports = router;
