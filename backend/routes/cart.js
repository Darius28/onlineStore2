import express from "express";
const router = express.Router();
import { validJwt } from "../middleware";
import {
  reviewItem,
  addToCart,
  getCheckoutCartItems,
  addCartItem,
  getCartItems
} from "../controllers/cart";

router.post("/item/:itemId/review-item", validJwt, reviewItem);
router.post("/:itemId/add-to-cart", validJwt, addToCart);
router.post("/get-checkout-cart-items", validJwt, getCheckoutCartItems);
router.post("/:cartId/add-cart-item", validJwt, addCartItem);
router.get("/get-cart-items", validJwt, getCartItems)

module.exports = router;
