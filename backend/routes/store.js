import express from "express";
import { selectedItem } from "../controllers/store";
import { validJwt } from "../middleware";

const router = express.Router();

router.get("/item/:itemId", selectedItem);

module.exports = router;
