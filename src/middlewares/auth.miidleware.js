import { Error } from "mongoose";
import { User } from "../models/user.model";

import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cokkies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    new ApiError(401, "Unauthoried Request");
  }
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = User.findById(decodedToken?._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    const error = new Error("eerro not found");
    error.statusCode = 404;
    throw error;
  }

  req.user = user;
  next();
});
