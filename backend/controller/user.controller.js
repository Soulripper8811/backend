import prisma from "../libs/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const Signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(400).json({ message: "Please fill all the fields" });
    }
    const exsitngUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (exsitngUser) {
      res.status(400).json({ message: "User already exist" });
    }
    const hasedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hasedPassword,
      },
    });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Erron in signup", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(400).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Incorrect password" });
    }
    const token = await generateToken(user);
    await res.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error in login", error);
    res.status(500).json({ message: "Server error" });
  }
};

const generateToken = async (user, res) => {
  const token = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};
