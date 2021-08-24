import express from "express";

import { becomeSeller, addItem } from "../controllers/seller";
const router = express.Router();

router.post("/become-seller", becomeSeller);
router.post("/add-item", addItem)

module.exports = router;
