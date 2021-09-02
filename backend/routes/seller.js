import express from "express";

import { becomeSeller, addItem, getSellerItems } from "../controllers/seller";
import { validJwt } from "../middleware";
const router = express.Router();

router.post("/become-seller", validJwt, becomeSeller);
router.post("/add-item", validJwt, addItem);
router.get("/get-seller-items", validJwt, getSellerItems);

module.exports = router;
