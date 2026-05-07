import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/response.js";
import { configDotenv } from "dotenv";

export const authMiddleware = async (req, res, next) => {
  try {

    const token = req.cookies.token;

    if (!token) {
      return sendResponse(
        res,
        401,
        false,
        "Not authorized, no token found"
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();

  } catch (error) {

    if (error.name === "TokenExpiredError") {
      return sendResponse(
        res,
        401,
        false,
        "Token expired"
      );
    }

    if (error.name === "JsonWebTokenError") {
      return sendResponse(
        res,
        401,
        false,
        "Invalid token"
      );
    }

    return sendResponse(
      res,
      401,
      false,
      "Not authorized, authentication failed"
    );
  }
};