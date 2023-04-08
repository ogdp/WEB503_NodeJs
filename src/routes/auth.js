import express from "express";
import {
  signup,
  signin,
  checkPermissions,
  createTokenFromTokenPrev,
} from "../controllers/auth";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/checkPermissions", checkPermissions);
router.post("/refreshToken", createTokenFromTokenPrev);
export default router;
