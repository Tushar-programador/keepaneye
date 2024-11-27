import { jwtSecret } from "../configs/env.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
export default async function accessToken(req, res, next) {
  const token =
    req.cokkies?.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized Request" });
  }
  const decrypt = jwt.verify(token, jwtSecret);

  const user = await User.findById(decrypt.userId).select("-password ");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  req.user = user;
  next();
}
