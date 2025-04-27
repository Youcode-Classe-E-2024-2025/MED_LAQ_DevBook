import express from "express";
import { getAllCategories} from "../controllers/categoryController.js";

const router = express.Router();

router.get('/categories',
  (req, res, next) => {
    next();
  },
  getAllCategories
);

export default router;
