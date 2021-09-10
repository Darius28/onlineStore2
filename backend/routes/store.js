import express from "express";
const router = express.Router();
import { selectedItem, getStoreItems } from "../controllers/store";

router.get("/item/:itemId", selectedItem);
router.get("/get-store-items", getStoreItems);

module.exports = router;
