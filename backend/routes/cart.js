import express from "express";
const router = express.Router();
import { validJwt } from "../middleware";
import {
  reviewItem,
  addNewCartItem,
  getCheckoutCartItems,
  addCartItem,
  removeCartItem,
  getCartItems,
  removeEntireCartItem,
  getCartLength,
  isCartItemAdded,
  updateOrders,
} from "../controllers/cart";

router.post("/item/:itemId/review-item", validJwt, reviewItem);
router.post("/add-new-cart-item", validJwt, addNewCartItem);
router.post("/get-checkout-cart-items", validJwt, getCheckoutCartItems);
router.post("/add-cart-item", validJwt, addCartItem);
router.post("/remove-cart-item", validJwt, removeCartItem);
router.get("/get-cart-items", validJwt, getCartItems);
router.post("/remove-entire-cart-item", validJwt, removeEntireCartItem);
router.get("/get-cart-length",  getCartLength);
router.post("/is-cart-item-added", isCartItemAdded);
router.post("/update-orders", validJwt, updateOrders);

module.exports = router;
