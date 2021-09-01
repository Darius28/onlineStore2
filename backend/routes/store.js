import express from "express";
import { selectedItem, reviewItem } from "../controllers/store";
import { validJwt } from "../middleware";

const router = express.Router();

router.get("/item/:itemId", selectedItem);
router.post("/item/:itemId/review-item", validJwt, reviewItem);

module.exports = router;
