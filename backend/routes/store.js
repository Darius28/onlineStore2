import express from "express";
const router = express.Router();
import { validJwt } from "../middleware";
import {
  selectedItem,
  getStoreItems,
  editStoreName,
} from "../controllers/store";

router.post("/item/:itemId",  selectedItem);
router.get("/get-store-items", getStoreItems);
router.post("/edit-store-name", validJwt, editStoreName);

module.exports = router;
