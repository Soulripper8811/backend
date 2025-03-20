import prisma from "../libs/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const Signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    const exsitngUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (exsitngUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });
    }
    const hasedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hasedPassword,
      },
    });
    const newUser = { ...user, password: undefined };
    const token = await generateToken(newUser);
    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
    return res.status(201).json({ success: true, newUser });
  } catch (error) {
    console.error("Erron in signup", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }
    const token = await generateToken(user);
    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error in login", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logut = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful", success: true });
};

export const getMe = async (req, res) => {
  try {
    const user = req.user;
    if (user) {
      res.status(200).json({ message: "User found", user });
    }
  } catch (error) {
    console.error("Error in getMe", error);
    return res.status(500).json({ message: "Server error" });
  }
};
const generateToken = async (user, res) => {
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};
