import express from "express";

import { becomeSeller } from "../controllers/seller";
const router = express.Router();

router.post("/become-seller", becomeSeller);

module.exports = router;
