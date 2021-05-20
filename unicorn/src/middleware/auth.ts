import config from "config";
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import JSONResponse from "../util/ResponseHandler";

import Payload from "../types/Payload";
import Request from "../types/Request";

export default function (req: Request, res: Response, next: NextFunction) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token
  if (!token) {
    return JSONResponse.noAuthorization(req, res, "No token, authorization denied", {})
  }
  // Verify token
  try {
    const payload: Payload | any = jwt.verify(token, config.get("jwtSecret"));
    req.userId = payload.userId;
    next();
  } catch (err) {
    JSONResponse.noAuthorization(req, res, "Token is not valid", {})
  }
}
