import { nanoid } from "nanoid";
import prisma from "../libs/prisma.js";

export const storeUrl = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  const { originalUrl } = req.body;
  try {
    if (!originalUrl) {
      return res
        .status(400)
        .json({ message: "Please fill all the fields", success: false });
    }
    const shortenedUrlCode = nanoid(6);
    const shortenedUrl = `https://bitfly/${shortenedUrlCode}`;
    const url = await prisma.url.create({
      data: {
        originalUrl,
        shortenedUrl,
        userId: req.user.id,
      },
    });
    res
      .status(201)
      .json({ success: true, message: "Url created successfully", url });
  } catch (error) {
    console.error("Error in storeUrl", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllUrls = async (req, res) => {
  try {
    const urls = await prisma.url.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    res.status(200).json({ message: "Urls found", urls });
  } catch (error) {
    console.error("Error in getAllUrls", error);
    res.status(500).json({ message: "Server error" });
  }
};
