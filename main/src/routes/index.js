import express from "express";
const router = express.Router();
import user from "./user.routes.js";

import organization from "./organization.routes.js";
import monitor from "./monitor.routes.js";
import website from "./website.routes.js";
router.use("/user", user);
router.use("/organization", organization);
router.use("/monitor", monitor);
router.use("/website", website);
export default router;
