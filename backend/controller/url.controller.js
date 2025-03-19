import { nanoid } from "nanoid";
import prisma from "../libs/prisma.js";

export const storeUrl = async (req, res) => {
  const { originalUrl } = req.body;
  try {
    if (!originalUrl) {
      res.status(400).json({ message: "Please fill all the fields" });
    }
    const shortenedUrlCode = await nanoid(6);
    const shortenedUrl = `https://bitfly/${shortenedUrlCode}`;
    const url = await prisma.url.create({
      data: {
        originalUrl,
        shortenedUrl,
        userId: req.user.id,
      },
    });
    res.status(201).json({ message: "Url created successfully", url });
  } catch (error) {
    console.error("Error in storeUrl", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUrl = async (req, res) => {
  const { shortenedUrl } = req.params;
  try {
    const url = await prisma.url.findFirst({
      where: {
        shortenedUrl,
      },
    });
    if (!url) {
      res.status(400).json({ message: "Url not found" });
    }
    res.status(200).json({ message: "Url found", url });
  } catch (error) {
    console.error("Error in getUrl", error);
  }
};

export const getAllUrls = async (req, res) => {
  try {
    const urls = await prisma.url.findMany();
    res.status(200).json({ message: "Urls found", urls });
  } catch (error) {
    console.error("Error in getAllUrls", error);
    res.status(500).json({ message: "Server error" });
  }
};
