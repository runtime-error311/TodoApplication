import jwt from "jsonwebtoken";
import { validationSignUp } from "../config/validation.js";
import User from "../model/user.js";
import bcrypt from "bcryptjs";
import { errResponse, successResponse } from "../utils/apiResponse.js";
import { Request, Response } from "express";

const JWT_SECRET = process.env.JWT_SECRET as string;
if (!JWT_SECRET) {
  throw new Error("JWT Secret is required!");
}
export const registerUser = async (req:Request, res:Response):Promise<Response|void> => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return errResponse(res, 400, "All fields required!");
    }
    const notValid = validationSignUp(req.body);
    if (notValid) {
      return errResponse(res, 400, notValid);
    }

    const user = await User.findOne({ email }).select("-password");
    if (user) {
      return errResponse(res, 409, "User already exists!");
    }
    const hashedPassowrd = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassowrd,
    });

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV==="production",
      sameSite:"lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    // req.session.userId = newUser._id;

    return successResponse(
      res,
      201,
      { id: newUser._id, name: newUser.name, email: newUser.email },
      "Sign Up Successfull!",
    );
  } catch (err:unknown) {
    if(err instanceof Error)
      return errResponse(res, 500, "Sign Up error is " + err.message);
    return errResponse(res, 500, "Unknown error while signing up");
  }
};

export const loginUser = async (req:Request, res:Response):Promise<Response|void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return errResponse(res, 400, "All fields required!");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return errResponse(res, 401, "Invalid Credentials!");
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return errResponse(res, 401, "Invalid Credentials!");
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV==="production",
      sameSite:"lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    // req.session.userId = user._id;

    return successResponse(
      res,
      200,
      { id: user._id, name: user.name, email: user.email },
      "Login Successfull!",
    );
  } catch (err:unknown) {
    if(err instanceof Error)
      return errResponse(res, 500, "Login error is " + err.message);
    return errResponse(res, 500, "Unknown err while Login");    
  }
};

export const logoutUser = async (req:Request, res:Response):Promise<Response|void> => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
    });
    return successResponse(res, 200, null, "Logout Successfull!");
  } catch (err:unknown) {
    if(err instanceof Error)
      return errResponse(res, 500, "Logout error is " + err.message);
    return errResponse(res, 500, "Unknown err while Logout");
  }
};

export const userCheck = async (req:Request, res:Response):Promise<Response|void> => {
  try {
    const { userId } = req;
    // const {userId} = req.session;
    if (!userId) {
      return errResponse(res, 401, "Unauthorized user!");
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return errResponse(res, 404, "User doesn't exist!");
    }
    return successResponse(res, 200, { user }, "User is authenticated!");
  } catch (err:unknown) {

    if(err instanceof Error)
      return errResponse(res, 500, "User check err is " + err.message);
    return errResponse(res, 500, "Unknown err while Logout ");
  }
};
