import { sendResponse } from "../utils/response.js";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

export const authMiddleware = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return sendResponse(res, 401, false, "Not authorized, no token found");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    console.log(error)
    return sendResponse(res, 401, false, "Not authorized, token failed");
  }
};
