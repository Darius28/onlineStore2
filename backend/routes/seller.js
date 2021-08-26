import express from "express";

import { becomeSeller, addItem } from "../controllers/seller";
import { validJwt } from "../middleware";
const router = express.Router();

router.post("/become-seller", validJwt, becomeSeller);
router.post("/add-item", validJwt, addItem);

module.exports = router;
