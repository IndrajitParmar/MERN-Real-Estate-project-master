import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { userName, userEmail, password } = req.body;
  // console.log("signup", userName, userEmail, password);
  const hashedPassword = bcrypt.hashSync(password, 10);
  // console.log("hashedPassword", hashedPassword);
  const newUser = new User({ userName, userEmail, password: hashedPassword });
  // console.log("newUser", newUser);
  try {
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { userEmail, password } = req.body;
  try {
    const validUser = await User.findOne({ userEmail });
    console.log(validUser);
    if (!validUser) return next(errorHandler(404, "User not Found"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid password"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
