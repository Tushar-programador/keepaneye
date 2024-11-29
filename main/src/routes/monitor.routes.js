import exprss from "express";
import accessToken from "../middlewares/auth.js";
import {
  assignTasksToGeoServers,
  updateStatus,
} from "../controllers/monitor.controllers.js";

const router = exprss.Router();

router.get("/", accessToken, assignTasksToGeoServers);
router.post("/update-status", accessToken, updateStatus);

export default router;
