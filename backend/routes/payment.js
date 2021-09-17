import express from "express";
import { validJwt } from "../middleware";
const router = express.Router();

import { getOrderId, verifySignature } from "../controllers/payment";

router.post("/get-order-id", validJwt, getOrderId);
router.post("/verify-signature", verifySignature);

module.exports = router;
