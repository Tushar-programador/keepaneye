import express from "express";
const router = express.Router();
import user from "./user.routes.js";

import organization from "./organization.routes.js";
import monitor from "./monitor.routes.js";

router.use("/user", user);
router.use("/organization", organization);
router.use("/monitor", monitor);
export default router;
