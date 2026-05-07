import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import { sendResponse } from "../utils/response.js";

const generateToken = ({ id, email }) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return sendResponse(res, 400, false, "All fields are required");
    }

    if (password.length < 8) {
      return sendResponse(
        res,
        400,
        false,
        "Password must be at least 8 characters",
      );
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return sendResponse(res, 400, false, "User already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    return sendResponse(res, 201, true, "User registered successfully", {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken({ id: user._id }),
    });
  } catch (error) {
    return sendResponse(res, 500, false, "Server error");
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendResponse(res, 400, false, "Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return sendResponse(res, 401, false, "Invalid credentials");
    }

    return sendResponse(res, 200, true, "Login successful",{
        token:generateToken({id:user._id,email:user.email})
      });
  } catch (error) {
    return sendResponse(res, 500, false, "Server error");
  }
};
