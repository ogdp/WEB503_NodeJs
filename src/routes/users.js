import express from "express";
import { getAll, getOne, remove } from "../controllers/users";
import { checkPermission } from "../middlewares/checkPermission";
const router = express.Router();

router.post("/users", getOne);
router.get("/users", checkPermission, getAll);
router.delete("/users/:id", checkPermission, remove);

export default router;
