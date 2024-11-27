import exprss from "express"
import accessToken from "../middlewares/auth";

const router = exprss.Router()


router.get('/', accessToken,);

export default router